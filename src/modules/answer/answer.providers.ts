import { Answer } from "./answer.model";

import { PROVIDERS } from "src/common/constants";

export const answerProviders = [
  {
    provide: PROVIDERS.ANSWERS_PROVIDER,
    useValue: Answer,
  },
];
