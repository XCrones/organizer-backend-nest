import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CalendarResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly uid: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly updatedAt: Date;
}
