import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { WeatherDTO } from './weather.dto';

export class WeatherBaseDTO extends WeatherDTO {
  @ApiProperty()
  @IsNumber()
  cityID: number;
}
