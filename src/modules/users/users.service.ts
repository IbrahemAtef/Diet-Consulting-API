/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Op } from "sequelize";
import { InvalidCredentials, UserAlreadyExists } from "src/common/utils/errors";
import { comparePassword, generateToken, hashPassword } from "src/common/utils";
import { Users } from "./users.model";
import { CONFIG, PROVIDERS } from "../../common/constants";
import { LoginDto, SignUpDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDERS.USER_PROVIDER)
    private readonly userModel: typeof Users,
    private readonly configService: ConfigService
  ) {}

  public async login(user: LoginDto): Promise<any> {
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
      this.configService.get(CONFIG.JWT_SECRET)
    );

    return { user: result, token };
  }

  private async findOneByEmailOrUserName(
    userName: string,
    email: string
  ): Promise<Users> {
    return this.userModel.scope(["basic"]).findOne({
      where: { [Op.or]: [{ userName }, { email }] },
    });
  }
  public async findUserById(id: number): Promise<Users> {
    return this.userModel.scope(["no_password", "basic"]).findOne({
      where: { id },
    });
  }
  public async signUp(user: SignUpDto): Promise<any> {
    const userFound = await this.findOneByEmailOrUserName(
      user.email,
      user.userName
    );

    if (userFound) {
      throw UserAlreadyExists;
    }
    // hash the password
    user.password = await hashPassword(user.password);

    // create the user
    const newUser = await this.userModel.create<Users>({ ...user });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser["dataValues"];

    // generate token
    const token = await generateToken(
      result.id,
      this.configService.get(CONFIG.JWT_SECRET)
    );

    // return the user and the token
    return { user: result, token };
  }
}
