import { User } from "../users/user.model";
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Answer } from "../answer/answer.model";

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
}
