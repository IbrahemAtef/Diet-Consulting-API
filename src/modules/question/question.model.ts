import { User } from "../users/user.model";
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from "sequelize-typescript";
import { Answer } from "../answer/answer.model";
import sequelize, { Op } from "sequelize";

@Scopes(() => ({
  oneQuestionWithAnswers: {
    include: [
      {
        model: Answer,
        required: false,
        where: {
          isDraft: false,
        },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      },
    ],
  },
  withAnswers(limit: number, userId: string, pageNum: number, offset: number) {
    return {
      attributes: [
        "id",
        "title",
        "description",
        [
          sequelize.fn("count", sequelize.col("Answer.question_id")),
          "totalAnswers",
        ],
      ],
      include: [
        {
          model: Answer,
          required: false,
          duplicating: false,
          where: {
            [Op.and]: [{ userId }, { isDraft: false }],
          },
        },
      ],
      group: ["Question.id"],
      order: [[sequelize.col("totalAnswers"), "ASC"]], // search for the order
      limit,
      offset: pageNum * offset,
    };
  },
}))
@Table({ paranoid: true, tableName: "Question", underscored: true })
export class Question extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @HasMany(() => Answer)
  answers: Answer[];

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.STRING)
  createdBy: string;

  @Column(DataType.STRING)
  updatedBy: string;

  @Column(DataType.STRING)
  deletedBy: string;
}
