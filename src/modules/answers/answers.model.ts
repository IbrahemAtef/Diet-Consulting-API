import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "../users/users.model";
import { Questions } from "../questions/questions.model";

@Table({ tableName: "Answers", paranoid: true, underscored: true })
export class Answers extends Model<Answers> {
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

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Questions)
  @Column(DataType.INTEGER)
  questionId: number;

  @BelongsTo(() => Questions)
  question: Questions;

  @BelongsTo(() => Users)
  user: Users;

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
