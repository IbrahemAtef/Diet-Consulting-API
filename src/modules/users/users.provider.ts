import { PROVIDERS } from "src/common/constants";
import { Users } from "./users.model";

export const UserProvider = [
  {
    provide: PROVIDERS.USER_PROVIDER,
    useFactory: () => {
      return Users;
    },
  },
];
