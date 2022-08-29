import { DataSource } from "typeorm";
import { PROVIDERS } from "src/common/constants";
import { Answers } from "./answers.model";

export const AnswerProvider = [
  {
    provide: PROVIDERS.ANSWER_PROVIDER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getMongoRepository(Answers),
    inject: [PROVIDERS.DATABASE_CONNECTION],
  },
];
