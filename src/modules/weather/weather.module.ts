import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherCurrentService } from './weather-current.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OpenWeatherModule } from '../open-weather/open-weather.module';
import { WeatherForecastService } from './weather-forecast.service';

import { WeatherCurrent } from './models/weather-current.model';
import { WeatherForecast } from './models/weather-forecast.model';
import { WeatherUser } from './models/weather.user.model';

@Module({
  imports: [
    OpenWeatherModule,
    SequelizeModule.forFeature([WeatherCurrent, WeatherForecast, WeatherUser]),
  ],
  controllers: [WeatherController],
  providers: [WeatherCurrentService, WeatherForecastService],
})
export class WeatherModule {}
