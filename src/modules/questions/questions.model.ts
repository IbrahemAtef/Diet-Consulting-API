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
import { Users } from "../users/users.model";
import { Answers } from "../answers/answers.model";
import { TAGS } from "./../../common/enums/tags.enums";

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
}))
@Table({
  paranoid: true,
  tableName: "Questions",
  underscored: true,
  timestamps: true,
})
export class Questions extends Model<Questions> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.ENUM(...Object.values(TAGS)))
  tags: string;

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
