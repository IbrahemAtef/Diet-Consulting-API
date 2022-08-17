import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { Transaction } from "sequelize";
import { Public } from "src/common/decorators";
import { TransactionParam } from "src/common/decorators/transaction.decorator";
import { LoginDto, SignUpDto } from "./dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors()
  @Public()
  @Post("signup")
  async signup(
    @Body() newUser: SignUpDto,
    @TransactionParam() transaction: Transaction
  ) {
    return this.userService.signUp(newUser, transaction);
  }

  @Public()
  @Post("login")
  async login(@Body() loginUser: LoginDto) {
    return this.userService.login(loginUser);
  }
}
