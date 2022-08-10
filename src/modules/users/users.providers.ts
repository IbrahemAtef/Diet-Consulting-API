import { User } from "./user.model";
import { PROVIDERS } from "../../common/constants/index";

export const usersProviders = [
  {
    provide: PROVIDERS.USERS_PROVIDER,
    useValue: User,
  },
];
