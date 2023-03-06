import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { EnumConfig } from './enumConfig/enum.config';
import { Todo } from 'src/modules/todos/models/todo.model';
import { Calendar } from 'src/modules/calendar/models/calendar.model';
import { WeatherForecast } from 'src/modules/weather/models/weather-forecast.model';
import { WeatherUser } from 'src/modules/weather/models/weather.user.model';

@Injectable()
export class SequalizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      pg: { dialect, logging, host, port, username, password, database },
    } = this.configService.get(EnumConfig.DATABASE);

    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [Todo, Calendar, WeatherForecast, WeatherUser],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
