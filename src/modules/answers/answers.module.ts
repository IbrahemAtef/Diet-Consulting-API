import { DatabaseModule } from "./../database/database.module";
import { Module } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswerProvider } from "./answers.provider";

@Module({
  imports: [DatabaseModule],
  providers: [AnswersService, ...AnswerProvider],
  exports: [AnswersService],
})
export class AnswersModule {}
