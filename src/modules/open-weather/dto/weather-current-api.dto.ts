import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { WeatherCurrentDTO } from './weather-current.dto';

export class WeatherCurrentApiDTO extends WeatherCurrentDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
