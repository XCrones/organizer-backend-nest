import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsJSON, IsEmpty } from 'class-validator';

export class WeatherCurrentDTO {
  @ApiProperty()
  @IsJSON()
  coord: {
    lon: number;
    lat: number;
  };

  @ApiProperty()
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
  @IsString()
  base: string;

  @ApiProperty()
  @IsJSON()
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
    sea_level: number;
    feels_like: number;
    grnd_level: number;
  };

  @ApiProperty()
  @IsNumber()
  visibility: number;

  @ApiProperty()
  @IsJSON()
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  @ApiProperty()
  @IsJSON()
  rain: {
    '1h': number;
    '3h': number;
  };

  @ApiProperty()
  @IsEmpty()
  @IsJSON()
  snow: {
    '1h': number;
    '3h': number;
  };

  @ApiProperty()
  @IsJSON()
  clouds: {
    all: number;
  };

  @ApiProperty()
  @IsNumber()
  dt: number;

  @ApiProperty()
  @IsJSON()
  sys: {
    id: number;
    type: number;
    sunset: number;
    country: string;
    sunrise: number;
    message: string;
  };

  @ApiProperty()
  @IsNumber()
  timezone: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  cod: number;
}
