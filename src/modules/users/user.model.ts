import { ROLES } from "./../../common/enums";
import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({ tableName: "User", underscored: true, paranoid: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  userName: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.ENUM(...Object.values(ROLES)))
  role: string;

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
