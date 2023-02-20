import { registerAs } from '@nestjs/config/dist';
import { EnumConfig } from './enumConfig/enum.config';
import { pgConfig } from './postgres.config';

export const databaseConfig = registerAs(EnumConfig.DATABASE, () => {
  return {
    pg: {
      ...pgConfig(),
    },
  };
});

export default () => ({
  port: process.env.SERVER_PORT,
});
