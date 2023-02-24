import { WeatherService } from './weather.service';
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
import { GetCityDTO } from './dto/get-city.dto';
import { WeatherResponse } from './response/response';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: WeatherResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get()
  testPost(@Body() dto: GetCityDTO) {
    return this.weatherService.getCity(dto);
  }
}
