import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { WeatherDTO } from './weather.dto';

export class WeatherApiDTO extends WeatherDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
}
