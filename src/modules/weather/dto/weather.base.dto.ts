import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { WeatherDTO } from 'src/open-weather/dto/weather.dto';

export class WeatherBaseDTO extends WeatherDTO {
  @ApiProperty()
  @IsNumber()
  cityID: number;
}
