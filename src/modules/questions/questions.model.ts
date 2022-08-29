import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Users } from "../users/users.model";
import { Answers } from "../answers/answers.model";
import { TAGS } from "./../../common/enums/tags.enums";

// @Scopes(() => ({
//   oneQuestionWithAnswers: {
//     include: [
//       {
//         model: Answers,
//         required: false,
//         where: {
//           isDraft: false,
//         },
//         include: [
//           {
//             model: Users,
//             attributes: ["id", "firstName", "lastName"],
//           },
//         ],
//       },
//     ],
//   },
// }))
@Entity({ name: "Questions" })
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "string" })
  title: string;

  @Column({ type: "string" })
  description: string;

  @Column({ enum: [...Object.values(TAGS)] })
  tags: string;

  @Column({ type: "number" })
  userId: number;

  @ManyToOne(() => Users, (user) => user.question)
  user: Users;

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
