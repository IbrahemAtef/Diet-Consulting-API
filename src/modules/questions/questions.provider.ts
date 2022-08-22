import { PROVIDERS } from "src/common/constants";
import { Questions } from "./questions.model";

export const QuestionProvider = [
  {
    provide: PROVIDERS.QUESTION_PROVIDER,
    useFactory: () => {
      return Questions;
    },
  },
];
