import { Inject, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { AnswerNotFound } from "src/common/utils/errors";
import { UserInfoDto } from "./../../common/dto/user_info.dto";
import { PROVIDERS } from "../../common/constants/providers.constants";
import { Answers } from "./answers.model";
import { CreateAnswersDto } from "./dto/create-answers.dto";
import { UpdateAnswersDto } from "./dto/update-answers.dto";

@Injectable()
export class AnswersService {
  constructor(
    @Inject(PROVIDERS.ANSWER_PROVIDER)
    private readonly answerModel: typeof Answers
  ) {}

  public async createOrUpdateDraftAnswer(
    answer: CreateAnswersDto,
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    const ans = await this.findDraft(questionId, user);
    if (ans) {
      return this.updateDraft(answer, questionId, user);
    } else {
      return this.answerModel.create({
        ...answer,
        questionId,
        userId: user.id,
        createdBy: user.id,
      });
    }
  }

  public async findAll(questionId: number): Promise<Answers[]> {
    const answers = await this.answerModel.findAll({
      where: { questionId, isDraft: false },
      order: [["createdAt", "DESC"]],
    });
    return answers;
  }

  public async findDraft(
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    return this.answerModel.findOne({
      where: {
        [Op.and]: [{ userId: user.id }, { questionId }, { isDraft: true }],
      },
    });
  }

  private async updateDraft(
    answer: UpdateAnswersDto,
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    const ans = await this.findDraft(questionId, user);
    await ans.update({ ...answer, updatedAt: new Date(), updatedBy: user.id });
    return ans;
  }

  public async publishDraft(
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    const ans = await this.findDraft(questionId, user);
    if (!ans) {
      throw AnswerNotFound;
    }
    await ans.update({
      updatedAt: new Date(),
      updatedBy: user.id,
      isDraft: false,
    });
    return ans;
  }

  public async deleteAnswer(
    answerId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    const answer = await this.answerModel.findOne({
      where: { id: answerId, userId: user.id },
    });
    if (!answer) {
      throw AnswerNotFound;
    }
    await answer.update({ deletedBy: user.id, deletedAt: new Date() });
    return answer;
  }
}
