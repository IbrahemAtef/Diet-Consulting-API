import { Module } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { AnswerController } from "./answer.controller";
import { answerProviders } from "./answer.providers";

@Module({
  providers: [AnswerService, ...answerProviders],
  controllers: [AnswerController],
})
export class AnswerModule {}
