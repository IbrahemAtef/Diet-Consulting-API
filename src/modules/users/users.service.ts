/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
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
    private readonly configService: ConfigService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  public async login(user: LoginDto): Promise<any> {
    this.logger.log("Login Called");
    const userFound = await this.findOneByEmailOrUserName(
      user.userNameOrEmail,
      user.userNameOrEmail
    );

    if (!userFound) {
      this.logger.warn(`User with email ${userFound.email} failed to login`);
      throw InvalidCredentials;
    }

    const checkPass = await comparePassword(user.password, userFound.password);
    if (!checkPass) {
      throw InvalidCredentials;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, middleName, ...result } = userFound["dataValues"];

    const token = await generateToken(
      result.id,
      this.configService.get(CONFIG.JWT_SECRET)
    );
    if (middleName) result.middleName = middleName;
    return { user: result, token };
  }

  private async findOneByEmailOrUserName(
    userName: string,
    email: string
  ): Promise<Users> {
    this.logger.log(`Finding user with email ${email} or username ${userName}`);
    return this.userModel.scope(["basic"]).findOne({
      where: { [Op.or]: [{ userName }, { email }] },
    });
  }
  public async findUserById(id: number): Promise<Users> {
    this.logger.log(`Finding user with id ${id}`);
    return this.userModel.scope(["no_password", "basic"]).findOne({
      where: { id },
    });
  }
  public async signUp(user: SignUpDto): Promise<any> {
    this.logger.log("Signup Called");
    const userFound = await this.findOneByEmailOrUserName(
      user.userName,
      user.email
    );

    if (userFound) {
      this.logger.warn(`User with email ${userFound.email} already exist`);
      throw UserAlreadyExists;
    }
    // hash the password
    user.password = await hashPassword(user.password);

    // create the user
    try {
      const newUser = await this.userModel.create<Users>({ ...user });
      // tslint:disable-next-line: no-string-literal
      const { password, middleName, ...result } = newUser["dataValues"];

      // generate token
      const token = await generateToken(
        result.id,
        this.configService.get(CONFIG.JWT_SECRET)
      );
      if (middleName) result.middleName = middleName;
      // return the user and the token
      return { user: result, token };
    } catch (error) {
      this.logger.error(
        `Error while signing up user ${user.email}, Error type is ${error}`
      );
    }
  }
}
