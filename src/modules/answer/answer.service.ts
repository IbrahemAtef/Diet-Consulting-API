import { UpdateAnswerDto } from "./dto/update-answer.dto";
import { Inject, Injectable } from "@nestjs/common";
import { Answer } from "./answer.model";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { PROVIDERS } from "./../../common/constants/providers.constants";
import { Transaction, Op } from "sequelize";
import { AnswerNotFound, DraftAlreadyExists } from "src/common/utils/errors";

@Injectable()
export class AnswerService {
  constructor(
    @Inject(PROVIDERS.ANSWERS_PROVIDER)
    private readonly answerModel: typeof Answer
  ) {}

  public async createOrUpdateDraftAnswer(
    answer: CreateAnswerDto,
    questionId: number,
    userId: number,
    transaction: Transaction
  ): Promise<Answer> {
    const ans = await this.findDraft(questionId, userId);
    if (ans) {
      return this.updateDraft(answer, questionId, userId, transaction);
    } else {
      return await this.answerModel.create(
        { ...answer, questionId, userId, createdBy: userId },
        { transaction }
      );
    }
  }

  public async findAll(questionId: number) {
    const answers = await this.answerModel.findAll({
      where: { questionId, isDraft: false, deletedAt: null },
      order: [["createdAt", "DESC"]],
    });
    return answers;
  }

  public async findDraft(questionId: number, userId: number) {
    return await this.answerModel.findOne({
      where: {
        [Op.and]: [{ userId }, { questionId }, { isDraft: true }],
      },
    });
  }

  private async updateDraft(
    answer: UpdateAnswerDto,
    questionId: number,
    userId: number,
    transaction: Transaction
  ) {
    const ans = await this.findDraft(questionId, userId);
    await ans.update(
      { ...answer, updatedAt: new Date(), updatedBy: userId },
      { transaction }
    );
    return ans;
  }

  public async publishDraft(
    questionId: number,
    userId: number,
    transaction: Transaction
  ) {
    const ans = await this.findDraft(questionId, userId);
    if (!ans) {
      throw AnswerNotFound;
    }
    await ans.update(
      { updatedAt: new Date(), updatedBy: userId, isDraft: false },
      { transaction }
    );
    return ans;
  }

  public async deleteAnswer(answerId: number, userId: number) {
    const answer = await this.answerModel.findOne({
      where: { id: answerId, userId },
    });
    if (!answer) {
      throw AnswerNotFound;
    }
    await answer.update({ deletedBy: userId, deletedAt: new Date() });
    return answer;
  }
}
