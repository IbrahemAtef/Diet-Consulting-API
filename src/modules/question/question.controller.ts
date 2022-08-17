import { UpdateQuestionDto } from "./dto/update-question.dto";
import { CreateAnswerDto } from "./../answer/dto/create-answer.dto";
import { User } from "./../users/user.model";
import { UserIdentity } from "./../../common/decorators/user.decorator";
import { CreateQuestionDto } from "./dto/create-question.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { ROLES } from "src/common/enums";
import { Roles } from "src/common/decorators/roles.decorator";
import { TransactionInterceptor } from "src/common/interceptors/transaction.interceptor";
import { TransactionParam } from "src/common/decorators/transaction.decorator";
import { Transaction } from "sequelize";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Roles(ROLES.PATIENT)
  @UseInterceptors(TransactionInterceptor)
  @Post()
  async createQuestion(
    @UserIdentity() user: User,
    @TransactionParam() transaction: Transaction,
    @Body() data: CreateQuestionDto
  ) {
    return this.questionService.createQuestion(data, user.id, transaction);
  }

  @Roles(ROLES.PATIENT)
  @UseInterceptors(TransactionInterceptor)
  @Delete(":questionId")
  async deleteQuestion(
    @UserIdentity() user: User,
    @TransactionParam() transaction: Transaction,
    @Param("questionId") questionId: number
  ) {
    return this.questionService.deleteQuestion(
      questionId,
      user.id,
      transaction
    );
  }

  @Roles(ROLES.PATIENT)
  @UseInterceptors(TransactionInterceptor)
  @Patch(":questionId")
  async updateQuestion(
    @UserIdentity() user: User,
    @TransactionParam() transaction: Transaction,
    @Param("questionId") questionId: number,
    @Body() data: UpdateQuestionDto
  ) {
    return this.questionService.updateQuestion(
      questionId,
      data,
      user.id,
      transaction
    );
  }

  @Roles(ROLES.CONSULTANT)
  @Get()
  async findAllQuestions(
    @UserIdentity() user: User,
    @Query("offset", ParseIntPipe) offset?: number,
    @Query("limit", ParseIntPipe) limit?: number
  ) {
    return this.questionService.getQuestions(limit, user.id, offset);
  }

  @Roles(ROLES.CONSULTANT)
  @Get(":questionId")
  async findOneQuestion(@Param("questionId") questionId: number) {
    return this.questionService.getOneQuestionWithAnswers(questionId);
  }

  @Roles(ROLES.CONSULTANT)
  @Post(":questionId")
  async createOrUpdateDraftAnswer(
    @UserIdentity() user: User,
    @TransactionParam() transaction: Transaction,
    @Body() data: CreateAnswerDto,
    @Param("questionId") questionId: number
  ) {
    return this.questionService.createOrUpdateDraftAnswer(
      questionId,
      user.id,
      data,
      transaction
    );
  }

  @Roles(ROLES.CONSULTANT)
  @Patch(":questionId")
  async submitDraftAnswer(
    @UserIdentity() user: User,
    @TransactionParam() transaction: Transaction,
    @Param("questionId") questionId: number
  ) {
    return this.questionService.submitDraftAnswer(
      questionId,
      user.id,
      transaction
    );
  }
}
