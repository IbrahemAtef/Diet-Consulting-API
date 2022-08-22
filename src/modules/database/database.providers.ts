import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { Users } from "../users/users.model";
import { Questions } from "../questions/questions.model";
import { Answers } from "./../answers/answers.model";
import { CONFIG } from "../../common/constants";

export const databaseProviders = [
  {
    provide: CONFIG.SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(CONFIG.DATABASE),
        sync: { force: false },
      });
      sequelize.addModels([Users, Questions, Answers]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
