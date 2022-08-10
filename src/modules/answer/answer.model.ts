import { User } from "../users/user.model";
import { Question } from "../question/question.model";
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  //   HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ paranoid: true, tableName: "Answer", underscored: true })
export class Answer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  recommendations: string;

  @Column(DataType.BOOLEAN)
  isDraft: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Question)
  @Column(DataType.INTEGER)
  questionId: number;
}
