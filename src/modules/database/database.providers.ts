import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DATABASE } from '../../common/constants/constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({ ...configService.get(DATABASE) });
      sequelize.addModels([]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
