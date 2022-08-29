import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
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
    private readonly questionRepository: Repository<Questions>,
    private readonly answersService: AnswersService
  ) {}

  public async createQuestion(
    question: CreateQuestionsDto,
    user: UserInfoDto
  ): Promise<Questions> {
    return this.questionRepository.save({
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
    const questions = await this.questionRepository.find({
      take: limit,
      skip: pageNr * offset,
      order: { tags: "DESC" },
    });
    return questions;
  }

  public async getOneQuestionWithAnswers(
    questionId: number
  ): Promise<Questions> {
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    if (!question) {
      throw QuestionNotFound;
    }
    const answers = await this.answersService.findAll(questionId);
    question.answers = answers;
    return question;
  }

  public async updateQuestion(
    questionId: number,
    data: UpdateQuestionsDto,
    user: UserInfoDto
  ): Promise<Questions> {
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
        userId: user.id,
      },
    });
    if (!question) {
      throw QuestionNotFound;
    }
    await this.questionRepository.update(question, {
      ...data,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    const question2 = await this.questionRepository.findOne({
      where: {
        id: questionId,
        userId: user.id,
      },
    });
    return question2;
  }

  public async deleteQuestion(
    questionId: number,
    user: UserInfoDto
  ): Promise<Questions> {
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
        userId: user.id,
      },
    });
    if (!question) {
      throw QuestionNotFound;
    }
    await this.questionRepository.update(question, {
      deletedBy: user.id,
    });
    await this.questionRepository.softDelete(question);
    const question2 = await this.questionRepository.findOne({
      where: {
        id: questionId,
        userId: user.id,
      },
    });
    return question2;
  }

  public async createOrUpdateDraftAnswer(
    questionId: number,
    user: UserInfoDto,
    data: CreateAnswersDto
  ): Promise<Answers> {
    const q = await this.questionRepository.findOne({
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
