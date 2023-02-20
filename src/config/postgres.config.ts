import { registerAs } from '@nestjs/config';
import { EnumConfig } from './enumConfig/enum.config';
import { Dialect } from 'sequelize';

export const pgConfig = registerAs(EnumConfig.DATABASE, () => {
  return {
    dialect: <Dialect>process.env.DB_DIALECT,
    logging: process.env.SQL_LOGGING === 'true' ? true : false,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    autoLoadEntities: true,
    synchronize: true,
  };
});
