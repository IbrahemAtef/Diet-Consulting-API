import { Question } from "./question.model";

import { PROVIDERS } from "src/common/constants";

export const questionProviders = [
  {
    provide: PROVIDERS.QUESTIONS_PROVIDER,
    useValue: Question,
  },
];
