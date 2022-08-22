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
import sequelize, { Op } from "sequelize";
import { Users } from "../users/users.model";
import { Answers } from "../answers/answers.model";

@Scopes(() => ({
  oneQuestionWithAnswers: {
    include: [
      {
        model: Answers,
        required: false,
        where: {
          isDraft: false,
        },
        include: [
          {
            model: Users,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      },
    ],
  },
  withAnswers(limit: number, userId: string, offset: number) {
    return {
      attributes: [
        "id",
        "title",
        "description",
        [
          sequelize.fn("count", sequelize.col("Answers.question_id")),
          "totalAnswers",
        ],
      ],
      include: [
        {
          model: Answers,
          required: false,
          duplicating: false,
          where: {
            [Op.and]: [{ userId }, { isDraft: false }],
          },
        },
      ],
      group: ["Questions.id"],
      order: [[sequelize.col("totalAnswers"), "ASC"]], // search for the order
      // limit,
      // offset: offset,
    };
  },
}))
@Table({ paranoid: true, tableName: "Questions", underscored: true })
export class Questions extends Model<Questions> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @HasMany(() => Answers)
  answers: Answers[];

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.INTEGER)
  createdBy: number;

  @Column(DataType.INTEGER)
  updatedBy: number;

  @Column(DataType.INTEGER)
  deletedBy: number;
}
