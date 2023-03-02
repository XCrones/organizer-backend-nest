import { Module } from '@nestjs/common';
import { OpenWeatherService } from './open-weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 1,
    }),
  ],
  providers: [OpenWeatherService],
  controllers: [],
  exports: [OpenWeatherService],
})
export class OpenWeatherModule {}
