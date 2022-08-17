import { CreateAnswerDto } from "./../answer/dto/create-answer.dto";
import { AnswerService } from "./../answer/answer.service";
import { Transaction } from "sequelize";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { Inject, Injectable } from "@nestjs/common";
import { PROVIDERS } from "src/common/constants";
import { Question } from "./question.model";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuestionNotFound } from "src/common/utils/errors";

@Injectable()
export class QuestionService {
  constructor(
    @Inject(PROVIDERS.QUESTIONS_PROVIDER)
    private readonly questionModel: typeof Question,
    private readonly answerService: AnswerService
  ) {}

  public async createQuestion(
    question: CreateQuestionDto,
    userId: number,
    transaction: Transaction
  ) {
    return await this.questionModel.create(
      { ...question, userId, createdBy: userId },
      { transaction }
    );
  }

  public async getQuestions(limit: number, userId: number, offset: number) {
    const questions = await this.questionModel
      .scope({ method: ["withAnswers", limit, offset, userId] })
      .findAll({ where: { deletedAt: null } }); // review it
    return {
      data: questions,
    };
  }

  public async getOneQuestionWithAnswers(questionId: number) {
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
    data: UpdateQuestionDto,
    userId: number,
    transaction: Transaction
  ) {
    const question = await this.questionModel.findOne({
      where: {
        id: questionId,
        userId,
      },
    });
    if (!question) {
      throw QuestionNotFound;
    }
    await question.update(
      { ...data, updatedAt: new Date(), updatedBy: userId },
      { transaction }
    );
    return question;
  }

  public async deleteQuestion(
    questionId: number,
    userId: number,
    transaction: Transaction
  ) {
    const question = await this.questionModel.findOne({
      where: {
        id: questionId,
        userId,
      },
    });
    if (!question) {
      throw QuestionNotFound;
    }
    await question.update(
      { deletedAt: new Date(), deletedBy: userId },
      { transaction }
    );
    return question;
  }

  public async createOrUpdateDraftAnswer(
    questionId: number,
    userId: number,
    data: CreateAnswerDto,
    transaction: Transaction
  ) {
    const q = await this.questionModel.findOne({
      where: {
        id: questionId,
        userId,
      },
    });
    if (!q) {
      throw QuestionNotFound;
    }
    return this.answerService.createOrUpdateDraftAnswer(
      data,
      questionId,
      userId,
      transaction
    );
  }

  public async submitDraftAnswer(
    questionId: number,
    userId: number,
    transaction: Transaction
  ) {
    return this.answerService.publishDraft(questionId, userId, transaction);
  }
}
