import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class WeatherByCityIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly cityId: number;
}

export class WeatherByNameDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly city: string;
}

export class WeatherByGeoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  lon: number;
}
