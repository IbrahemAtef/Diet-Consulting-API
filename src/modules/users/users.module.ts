import { DatabaseModule } from "./../database/database.module";
import { Logger, Module } from "@nestjs/common";
import { UserProvider } from "./users.provider";
import { UsersService } from "./users.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...UserProvider, Logger],
  controllers: [AuthController],
})
export class UsersModule {}
