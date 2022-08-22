import { Module } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswerProvider } from "./answers.provider";

@Module({
  providers: [AnswersService, ...AnswerProvider],
  exports: [AnswersService],
})
export class AnswersModule {}
