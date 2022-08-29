import { PROVIDERS } from "src/common/constants";
import { DataSource } from "typeorm";
import { Users } from "./users.model";

export const UserProvider = [
  {
    provide: PROVIDERS.USER_PROVIDER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getMongoRepository(Users),
    inject: [PROVIDERS.DATABASE_CONNECTION],
  },
];
