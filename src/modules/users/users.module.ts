import { Module } from "@nestjs/common";
import { UserProvider } from "./users.provider";
import { UsersService } from "./users.service";
import { AuthController } from "./auth.controller";

@Module({
  providers: [UsersService, ...UserProvider],
  controllers: [AuthController],
})
export class UsersModule {}
