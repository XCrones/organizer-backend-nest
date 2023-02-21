import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventStart: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventEnd: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly background: string;
}
