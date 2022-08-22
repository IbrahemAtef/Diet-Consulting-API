import { PROVIDERS } from "src/common/constants";
import { Answers } from "./answers.model";

export const AnswerProvider = [
  {
    provide: PROVIDERS.ANSWER_PROVIDER,
    useFactory: () => {
      return Answers;
    },
  },
];
