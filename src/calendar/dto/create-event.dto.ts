import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateCalendarEventDto {
  @IsNotEmpty()
  @IsNumber()
  readonly uid: number;

  @IsNotEmpty()
  @IsDate()
  eventStart: Date;

  @IsNotEmpty()
  @IsDate()
  eventEnd: Date;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly background: string;
}
