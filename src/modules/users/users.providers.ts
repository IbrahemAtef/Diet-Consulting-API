import { User } from "./user.model";
import { REPOSITORY } from "../../common/constants/index";

export const usersProviders = [
  {
    provide: REPOSITORY.USER_REPOSITORY,
    useValue: User,
  },
];
