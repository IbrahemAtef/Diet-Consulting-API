import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/database.module";
import currentConfig from "../config";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, load: [currentConfig] }),
  ],
})
export class AppModule {}
