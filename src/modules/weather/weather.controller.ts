import { WeatherCurrentService } from './weather-current.service';
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
import { CurrentResponse } from './response/current.response';
import { WeatherForecastService } from './weather-forecast.service';
import { ForecastResponse } from './response/forecast.response';
import { UserDTO } from '../auth/dto/user.dto';
import { WeatherUserService } from './services/weather-user.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherCurrentService: WeatherCurrentService,
    private readonly weatherForecastService: WeatherForecastService,
    private readonly weatherUserService: WeatherUserService,
  ) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: CurrentResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get('current')
  getCurrent(@Body() dto: GetWeatherDTO): Promise<CurrentResponse> {
    return this.weatherCurrentService.getCurrent(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: ForecastResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get()
  async getForecast(
    @Body() dto: GetWeatherDTO,
    @Req() request,
  ): Promise<ForecastResponse> {
    const user: UserDTO = request.user;
    const weather = await this.weatherForecastService.getForecast(dto);
    return this.weatherUserService.addCity(user.id, weather);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<number> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Delete(':cityId')
  dropCity(@Param('cityId') cityId: number, @Req() request): Promise<number[]> {
    const user: UserDTO = request.user;
    return this.weatherUserService.dropCity(user.id, +cityId);
  }
}
