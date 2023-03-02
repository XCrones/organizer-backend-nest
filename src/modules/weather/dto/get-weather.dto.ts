import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetWeatherDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly city: string;
}
