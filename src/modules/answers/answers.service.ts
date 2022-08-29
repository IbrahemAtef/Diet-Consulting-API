import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
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
    private readonly answerRepository: Repository<Answers>
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
      const a = await this.answerRepository.save({
        ...answer,
        questionId,
        userId: user.id,
        createdBy: user.id,
      });

      return a;
    }
  }

  public async findAll(questionId: number): Promise<Answers[]> {
    const answers = await this.answerRepository.find({
      where: { questionId, isDraft: false },
      order: { createdAt: "DESC" },
    });
    return answers;
  }

  public async findDraft(
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    return this.answerRepository.findOne({
      where: {
        userId: user.id,
        questionId,
        isDraft: true,
      },
    });
  }

  private async updateDraft(
    answer: UpdateAnswersDto,
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    const ans = await this.findDraft(questionId, user);
    await this.answerRepository.update(ans, {
      ...answer,
      updatedAt: new Date(),
      updatedBy: user.id,
    });
    const ans2 = await this.findDraft(questionId, user);
    return ans2;
  }

  public async publishDraft(
    questionId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    const ans = await this.findDraft(questionId, user);
    if (!ans) {
      throw AnswerNotFound;
    }
    await this.answerRepository.update(ans, {
      updatedAt: new Date(),
      updatedBy: user.id,
      isDraft: false,
    });
    const ans2 = await this.findDraft(questionId, user);
    return ans2;
  }

  public async deleteAnswer(
    answerId: number,
    user: UserInfoDto
  ): Promise<Answers> {
    const answer = await this.answerRepository.findOne({
      where: { id: answerId, userId: user.id },
    });
    if (!answer) {
      throw AnswerNotFound;
    }
    await this.answerRepository.update(answer, {
      deletedBy: user.id,
      deletedAt: new Date(),
    });
    await this.answerRepository.softDelete(answer);
    const answer2 = await this.answerRepository.findOne({
      where: { id: answerId, userId: user.id },
    });
    return answer2;
  }
}
