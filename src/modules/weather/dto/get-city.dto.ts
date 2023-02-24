import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCityDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly city: string;
}
