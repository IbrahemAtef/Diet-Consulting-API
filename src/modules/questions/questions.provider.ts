import { DataSource } from "typeorm";
import { PROVIDERS } from "src/common/constants";
import { Questions } from "./questions.model";

export const QuestionProvider = [
  {
    provide: PROVIDERS.QUESTION_PROVIDER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getMongoRepository(Questions),
    inject: [PROVIDERS.DATABASE_CONNECTION],
  },
];
