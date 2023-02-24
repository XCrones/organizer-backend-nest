import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ResponseDate } from 'src/common/response-date';

export class CalendarResponse extends ResponseDate {
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
}
