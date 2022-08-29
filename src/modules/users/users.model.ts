import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Questions } from "./../questions/questions.model";
import { Answers } from "./../answers/answers.model";
import { ROLES } from "../../common/enums";

// @Scopes(() => {
//   return {
//     no_password: {
//       attributes: {
//         exclude: ["password"],
//       },
//     },
//     basic: {
//       attributes: {
//         exclude: [
//           "updatedAt",
//           "createdAt",
//           "updatedBy",
//           "createdBy",
//           "deletedAt",
//           "deletedBy",
//         ],
//       },
//     },
//   };
// })
@Entity({ name: "Users" })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "string" })
  userName: string;

  @Column({ unique: true, type: "string" })
  email: string;

  @Column({ type: "string" })
  password: string;

  @Column({ type: "string" })
  firstName: string;

  @Column({ type: "string" })
  middleName?: string;

  @Column({ type: "string" })
  lastName: string;

  @Column({ enum: [...Object.values(ROLES)] })
  role: string;

  @OneToMany(() => Questions, (question) => question.userId)
  question: Questions[];

  @OneToMany(() => Answers, (answer) => answer.questionId)
  answers: Answers[];

  @Column({ type: "date", default: Date.now() })
  createdAt: Date;

  @Column({ type: "date" })
  updatedAt: Date;

  @Column({ type: "date" })
  deletedAt: Date;

  @Column({ type: "number" })
  createdBy: number;

  @Column({ type: "number" })
  updatedBy: number;

  @Column({ type: "number" })
  deletedBy: number;
}
