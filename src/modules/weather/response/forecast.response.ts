import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ResponseDate } from 'src/common/response-date';
import { IWeatherItem } from 'src/modules/open-weather/models/weather-item.model';

export class ForecastResponse extends ResponseDate {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
