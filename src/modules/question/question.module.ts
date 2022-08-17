import { DatabaseModule } from "./../database/database.module";
import { AnswerModule } from "./../answer/answer.module";
import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { questionProviders } from "./question.providers";

@Module({
  imports: [AnswerModule, DatabaseModule],
  providers: [QuestionService, ...questionProviders],
  controllers: [QuestionController],
})
export class QuestionModule {}
