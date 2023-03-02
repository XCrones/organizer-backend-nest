import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { WeatherCurrentDTO } from 'src/modules/open-weather/dto/weather-current.dto';

export class WeatherCurrentBaseDTO extends WeatherCurrentDTO {
  @ApiProperty()
  @IsNumber()
  cityID: number;
}
