import { WeatherCurrentService } from './weather-current.service';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetWeatherDTO } from './dto/get-weather.dto';
import { CurrentResponse } from './response/current.response';
import { WeatherForecastService } from './weather-forecast.service';
import { ForecastResponse } from './response/forecast.response';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherCurrentService: WeatherCurrentService,
    private readonly weatherForecastService: WeatherForecastService,
  ) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: CurrentResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get('current')
  getCurrent(@Body() dto: GetWeatherDTO) {
    return this.weatherCurrentService.getCurrent(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: ForecastResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get('forecast')
  getForecast(@Body() dto: GetWeatherDTO) {
    return this.weatherForecastService.getForecast(dto);
  }
}
