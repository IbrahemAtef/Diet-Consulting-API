import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { questionProviders } from "./question.providers";

@Module({
  providers: [QuestionService, ...questionProviders],
  controllers: [QuestionController],
})
export class QuestionModule {}
