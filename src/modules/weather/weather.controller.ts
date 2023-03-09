import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ForecastResponse } from './response/forecast.response';
import { UserDTO } from '../auth/dto/user.dto';
import { WeatherUserService } from './services/weather-user.service';
import { ICityWeather } from './interfaces/city-weather.interface';
import {
  WeatherByGeoDTO,
  WeatherByNameDTO,
} from '../open-weather/dto/weather-geo.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherUserService: WeatherUserService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<ICityWeather[]> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get()
  getCities(@Req() request): Promise<ICityWeather[]> {
    const user: UserDTO = request.user;
    return this.weatherUserService.getCities(user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: ForecastResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getForecastById(
    @Param('id') id: number,
    @Req() request,
  ): Promise<ForecastResponse> {
    const user: UserDTO = request.user;
    return this.weatherUserService.searchCity(+id, +user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<ICityWeather> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Post('city-name')
  getForecastByName(
    @Body() dto: WeatherByNameDTO,
    @Req() request,
  ): Promise<ICityWeather[]> {
    const user: UserDTO = request.user;
    return this.weatherUserService.addCityByName(+user.id, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<ICityWeather> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Post('city-geo')
  getForecastByGeo(
    @Body() dto: WeatherByGeoDTO,
    @Req() request,
  ): Promise<ICityWeather[]> {
    const user: UserDTO = request.user;
    return this.weatherUserService.addCityByGeo(+user.id, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<ICityWeather[]> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  dropCity(@Param('id') id: number, @Req() request): Promise<ICityWeather[]> {
    const user: UserDTO = request.user;
    return this.weatherUserService.dropCity(+user.id, +id);
  }
}
