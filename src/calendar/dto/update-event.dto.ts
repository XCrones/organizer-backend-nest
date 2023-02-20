import { IsNotEmpty, IsNumber, IsDate, IsString } from 'class-validator';

export class UpdateCalendarEventDto {
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
