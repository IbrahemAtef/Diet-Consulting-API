import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { UsersService } from "./users.service";
import { LoginDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post("signup")
  async signup(@Body() newUser: SignUpDto): Promise<any> {
    return this.usersService.signUp(newUser);
  }

  @Public()
  @Post("login")
  async login(@Body() loginUser: LoginDto): Promise<any> {
    return this.usersService.login(loginUser);
  }
}
