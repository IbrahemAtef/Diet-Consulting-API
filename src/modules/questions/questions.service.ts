import { Inject, Injectable } from "@nestjs/common";
import { QuestionNotFound } from "src/common/utils/errors";
import { PROVIDERS } from "src/common/constants";
import { UserInfoDto } from "src/common/dto/user_info.dto";
import { AnswersService } from "../answers/answers.service";
import { Questions } from "./questions.model";
import { Answers } from "../answers/answers.model";
import { CreateQuestionsDto } from "./dto/create-questions.dto";
import { UpdateQuestionsDto } from "./dto/update-questions.dto";
import { CreateAnswersDto } from "../answers/dto/create-answers.dto";

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(PROVIDERS.QUESTION_PROVIDER)
    private readonly questionModel: typeof Questions,
    private readonly answersService: AnswersService
  ) {}

  public async createQuestion(
    question: CreateQuestionsDto,
    user: UserInfoDto
  ): Promise<Questions> {
    return this.questionModel.create({
      ...question,
      userId: user.id,
      createdBy: user.id,
    });
  }

  public async getAllQuestions(
    limit: number,
    offset: number,
    pageNr: number
  ): Promise<Questions[]> {
    // console.log(limit, offset, pageNr);

    const questions = await this.questionModel.findAll({
      limit,
      offset: pageNr * offset,
      order: [["tags", "DESC"]],
    });
    return questions;
  }

  public async getOneQuestionWithAnswers(
    questionId: number
  ): Promise<Questions> {
    const question = await this.questionModel
      .scope("oneQuestionWithAnswers")
      .findOne({
        where: {
          id: questionId,
        },
      });
    if (!question) {
      throw QuestionNotFound;
    }
    return question;
  }

  public async updateQuestion(
    questionId: number,
    data: UpdateQuestionsDto,
    user: UserInfoDto
  ): Promise<Questions> {
    const question = await this.questionModel.findOne({
      where: {
        id: questionId,
        userId: user.id,
      },
    });
    if (!question) {
      throw QuestionNotFound;
    }
    await question.update({
      ...data,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    return question;
  }

  public async deleteQuestion(
    questionId: number,
    user: UserInfoDto
  ): Promise<Questions> {
    const question = await this.questionModel.findOne({
      where: {
        id: questionId,
        userId: user.id,
      },
    });
    if (!question) {
      throw QuestionNotFound;
    }
    await question.update({ deletedBy: user.id });
    await question.destroy();
    return question;
  }

  public async createOrUpdateDraftAnswer(
    questionId: number,
    user: UserInfoDto,
    data: CreateAnswersDto
  ): Promise<Answers> {
    const q = await this.questionModel.findOne({
      where: {
        id: questionId,
      },
    });
    if (!q) {
      throw QuestionNotFound;
    }

    return this.answersService.createOrUpdateDraftAnswer(
      data,
      questionId,
      user
    );
  }

  public async submitDraftAnswer(
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    return this.answersService.publishDraft(questionId, user);
  }
}
