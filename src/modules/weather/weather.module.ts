import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OpenWeatherModule } from '../open-weather/open-weather.module';
import { WeatherForecastService } from './services/weather-forecast.service';

import { WeatherForecast } from './models/weather-forecast.model';
import { WeatherUser } from './models/weather.user.model';
import { WeatherUserService } from './services/weather-user.service';

@Module({
  imports: [
    OpenWeatherModule,
    SequelizeModule.forFeature([WeatherForecast, WeatherUser]),
  ],
  controllers: [WeatherController],
  providers: [WeatherForecastService, WeatherUserService],
})
export class WeatherModule {}
