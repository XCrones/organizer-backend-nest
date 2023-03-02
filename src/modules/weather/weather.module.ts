import { OpenWeatherModule } from './../../open-weather/open-weather.module';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { Weather } from './models/weather.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [OpenWeatherModule, SequelizeModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
