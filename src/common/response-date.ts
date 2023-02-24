import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseDate {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly updatedAt: Date;
}
