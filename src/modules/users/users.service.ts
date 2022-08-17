/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from "@nestjs/common";
import { PROVIDERS } from "../../common/constants";
import { User } from "./user.model";
import { LoginDto, SignUpDto } from "./dto";
import { comparePassword, generateToken, hashPassword } from "src/common/utils";
import { ConfigService } from "@nestjs/config";
import { Op } from "sequelize";
import { InvalidCredentials, UserAlreadyExists } from "src/common/utils/errors";

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDERS.USERS_PROVIDER)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService
  ) {}

  private async create(user: SignUpDto): Promise<User> {
    return await this.userModel.create<User>({ ...user });
  }

  public async login(user: LoginDto) {
    const userFound = await this.findOneByEmailOrUserName(
      user.userNameOrEmail,
      user.userNameOrEmail
    );

    if (!userFound) {
      throw InvalidCredentials;
    }

    const checkPass = await comparePassword(user.password, userFound.password);
    if (!checkPass) {
      throw InvalidCredentials;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = userFound["dataValues"];

    const token = await generateToken(
      result.id,
      this.configService.get("jwtSecret")
    );

    return { user: result, token };
  }

  private async findOneByEmailOrUserName(
    userName: string,
    email: string
  ): Promise<User> {
    return await this.userModel.findOne({
      where: { [Op.or]: [{ userName }, { email }] },
    });
  }

  public async signUp(user: SignUpDto) {
    const userFound = await this.findOneByEmailOrUserName(
      user.email,
      user.userName
    );

    if (userFound) {
      throw UserAlreadyExists;
    }
    // hash the password
    const pass = await hashPassword(user.password);

    // create the user
    const newUser = await this.create({ ...user, password: pass });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser["dataValues"];

    // generate token
    const token = await generateToken(
      result.id,
      this.configService.get("jwtSecret")
    );

    // return the user and the token
    return { user: result, token };
  }
}
