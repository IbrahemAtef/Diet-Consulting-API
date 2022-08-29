import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "../users/users.model";
import { Questions } from "../questions/questions.model";

@Entity({ name: "Answers" })
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "string" })
  title: string;

  @Column({ type: "string" })
  description: string;

  @Column({ type: "string" })
  recommendations: string;

  @Column({ type: "boolean" })
  isDraft: boolean;

  @ManyToOne(() => Questions, (question) => question.answers)
  question: Questions;

  @Column({ type: "number" })
  userId: number;

  @Column({ type: "number" })
  questionId: number;

  @ManyToOne(() => Users, (user) => user.answers)
  user: Users;

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
