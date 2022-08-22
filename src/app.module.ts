import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/database.module";
import { UsersModule } from "./modules/users/users.module";
import { QuestionsModule } from "./modules/questions/questions.module";
import { AnswersModule } from "./modules/answers/answers.module";
import currentConfig from "../config";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, load: [currentConfig] }),
    UsersModule,
    QuestionsModule,
    AnswersModule,
  ],
})
export class AppModule {}
