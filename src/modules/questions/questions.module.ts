import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AnswersModule } from "../answers/answers.module";
import { QuestionsController } from "./questions.controller";
import { QuestionsService } from "./questions.service";
import { QuestionProvider } from "./questions.provider";

@Module({
  imports: [AnswersModule, DatabaseModule],
  providers: [QuestionsService, ...QuestionProvider],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
