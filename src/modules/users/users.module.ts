import { usersProviders } from "./users.providers";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthController } from "./auth.controller";

@Module({
  providers: [UsersService, ...usersProviders],
  controllers: [AuthController],
})
export class UsersModule {}
