import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsJSON } from 'class-validator';
import { IWeatherItem } from '../models/weather-item.model';

export class WeatherForecastDTO {
  @ApiProperty()
  @IsString()
  cod: string;

  @ApiProperty()
  @IsNumber()
  message: number;

  @ApiProperty()
  @IsNumber()
  cnt: number;

  @ApiProperty()
  @IsJSON()
  list: Array<IWeatherItem>;

  @ApiProperty()
  @IsJSON()
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
