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
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire: process.env.JWT_EXPIRE,
  weather_token: process.env.WEATHER_TOKEN,
  weather_url_api: process.env.WEATHER_URL_API,
  weather_url_icon: process.env.WEATHER_URL_ICON,
  weather_url_icon_postfix: process.env.WEATHER_URL_ICON_POSTFIX,
  weather_update_timeout: process.env.WEATHER_UPDATE_TIMEOUT,
});
