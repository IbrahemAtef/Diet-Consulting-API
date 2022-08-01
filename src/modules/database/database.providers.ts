import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { CONFIG } from "../../common/constants";

export const databaseProviders = [
  {
    provide: CONFIG.SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(CONFIG.DATABASE),
      });
      sequelize.addModels([]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
