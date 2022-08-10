import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/database/database.module";
import { UsersModule } from "./modules/users/users.module";
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import currentConfig from "../config";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, load: [currentConfig] }),
    UsersModule,
    QuestionModule,
    AnswerModule,
  ],
})
export class AppModule {}
