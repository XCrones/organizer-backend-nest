import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsJSON } from 'class-validator';
import { ResponseDate } from 'src/common/response-date';
import { ICityWeather } from '../interfaces/city-weather.interface';

export class CurrentResponse extends ResponseDate {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  uid: number;

  @ApiProperty()
  @IsJSON()
  citiesId: ICityWeather[];
}
