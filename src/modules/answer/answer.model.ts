import { User } from "../users/user.model";
import { Question } from "../question/question.model";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  //   HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "Answer", paranoid: true, underscored: true })
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

  @BelongsTo(() => Question)
  question: Question;

  @BelongsTo(() => User)
  user: User;

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
  // @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  // verified: boolean;
}
