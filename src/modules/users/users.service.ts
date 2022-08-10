/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY } from "../../common/constants";
import { User } from "./user.model";
import { LoginDto, SignUpDto } from "./dto";
import { generateToken, hashPassword } from "src/common/utils";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly configService: ConfigService
  ) {}

  private async create(user: SignUpDto): Promise<User> {
    return await this.userRepository.create<User>({ ...user });
  }

  public async login(user: LoginDto) {
    const newUser = await this.findOneByEmail(user.email);

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser["dataValues"];
    const token = await generateToken(
      result.id,
      this.configService.get("jwtSecret")
    );
    return { user: result, token };
  }

  private async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async signUp(user: SignUpDto) {
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
