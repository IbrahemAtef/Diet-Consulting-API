import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { Users } from "../users/users.model";
import { Questions } from "../questions/questions.model";
import { Answers } from "./../answers/answers.model";
import { CONFIG, PROVIDERS } from "../../common/constants";

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get(CONFIG.DATABASE).dialect,
        host: configService.get(CONFIG.DATABASE).host || "localhost",
        port: configService.get(CONFIG.DATABASE).port || 27017,
        database: configService.get(CONFIG.DATABASE).database || "test",
        entities: [Users, Questions, Answers],
        logging: true,
        synchronize: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // do we need await
      return await dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
