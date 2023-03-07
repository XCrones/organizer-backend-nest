import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetWeatherDTO } from './dto/get-weather.dto';
import { WeatherForecastService } from './services/weather-forecast.service';
import { ForecastResponse } from './response/forecast.response';
import { UserDTO } from '../auth/dto/user.dto';
import { WeatherUserService } from './services/weather-user.service';
import { ICityWeather } from './interfaces/city-weather.interface';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherForecastService: WeatherForecastService,
    private readonly weatherUserService: WeatherUserService,
  ) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: ForecastResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get('forecast')
  async getForecast(
    @Body() dto: GetWeatherDTO,
    @Req() request,
  ): Promise<ForecastResponse> {
    const user: UserDTO = request.user;
    const weather = await this.weatherForecastService.getForecast(dto);
    return this.weatherUserService.addCity(user.id, weather);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<ICityWeather> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  dropCity(@Param('id') id: number, @Req() request): Promise<ICityWeather[]> {
    const user: UserDTO = request.user;
    return this.weatherUserService.dropCity(user.id, +id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<ICityWeather> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get('cities')
  async getCities(@Req() request): Promise<ICityWeather[]> {
    const user: UserDTO = request.user;
    return this.weatherUserService.getCities(user.id);
  }
}
