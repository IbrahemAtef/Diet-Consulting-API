import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ROLES } from "src/common/enums";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserInfoDto } from "src/common/dto/user_info.dto";
import { UserIdentity } from "../../common/decorators/user.decorator";
import { QuestionsService } from "./questions.service";
import { Questions } from "./questions.model";
import { Answers } from "../answers/answers.model";
import { CreateQuestionsDto } from "./dto/create-questions.dto";
import { UpdateQuestionsDto } from "./dto/update-questions.dto";
import { CreateAnswersDto } from "../answers/dto/create-answers.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Roles(ROLES.PATIENT)
  @Post()
  async createQuestion(
    @UserIdentity() user: UserInfoDto,
    @Body() data: CreateQuestionsDto
  ): Promise<Questions> {
    return this.questionsService.createQuestion(data, user);
  }

  @Roles(ROLES.PATIENT)
  @Delete(":questionId")
  async deleteQuestion(
    @UserIdentity() user: UserInfoDto,
    @Param("questionId") questionId: number
  ): Promise<Questions> {
    return this.questionsService.deleteQuestion(questionId, user);
  }

  @Roles(ROLES.PATIENT)
  @Patch(":questionId")
  async updateQuestion(
    @UserIdentity() user: UserInfoDto,
    @Param("questionId") questionId: number,
    @Body() data: UpdateQuestionsDto
  ): Promise<Questions> {
    return this.questionsService.updateQuestion(questionId, data, user);
  }

  @Roles(ROLES.CONSULTANT)
  @Get()
  async findAllQuestions(
    @Query("offset") offset?: number,
    @Query("limit") limit?: number,
    @Query("pageNr") pageNr?: number
  ): Promise<Questions[]> {
    return this.questionsService.getAllQuestions(
      limit || 10,
      offset || 10,
      pageNr || 0
    );
  }

  @Roles(ROLES.CONSULTANT)
  @Get(":questionId")
  async findOneQuestion(
    @Param("questionId") questionId: number
  ): Promise<Questions> {
    return this.questionsService.getOneQuestionWithAnswers(questionId);
  }

  @Roles(ROLES.CONSULTANT)
  @Post(":questionId")
  async createOrUpdateDraftAnswer(
    @UserIdentity() user: UserInfoDto,
    @Body() data: CreateAnswersDto,
    @Param("questionId") questionId: number
  ): Promise<Answers> {
    return this.questionsService.createOrUpdateDraftAnswer(
      questionId,
      user,
      data
    );
  }

  @Roles(ROLES.CONSULTANT)
  @Patch("/submitDraft/:questionId")
  async submitDraftAnswer(
    @UserIdentity() user: UserInfoDto,
    @Param("questionId") questionId: number
  ): Promise<Answers> {
    return this.questionsService.submitDraftAnswer(questionId, user);
  }
}
