import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
  AutoIncrement,
  Scopes,
} from "sequelize-typescript";
import { ROLES } from "../../common/enums";

@Scopes(() => {
  return {
    no_password: {
      attributes: {
        exclude: ["password"],
      },
    },
    basic: {
      attributes: {
        exclude: [
          "updatedAt",
          "createdAt",
          "updatedBy",
          "createdBy",
          "deletedAt",
          "deletedBy",
        ],
      },
    },
  };
})
@Table({
  tableName: "Users",
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  userName: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  middleName?: string;

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

  @Column(DataType.INTEGER)
  createdBy: number;

  @Column(DataType.INTEGER)
  updatedBy: number;

  @Column(DataType.INTEGER)
  deletedBy: number;
}
