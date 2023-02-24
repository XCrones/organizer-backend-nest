import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsJSON } from 'class-validator';
import { ResponseDate } from 'src/common/response-date';

export class WeatherResponse extends ResponseDate {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  coord: {
    lon: number;
    lat: number;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  base: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  visibility: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  rain: {
    '1h': number;
    '3h': number;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  snow: {
    '1h': number;
    '3h': number;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  clouds: {
    all: number;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  dt: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
    message: string;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  timezone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cityID: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cod: number;
}
