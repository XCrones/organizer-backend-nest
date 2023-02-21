import { IsNotEmpty, IsNumber, IsDate, IsString } from 'class-validator';

export class UpdateCalendarEventDto {
  @IsNotEmpty()
  @IsNumber()
  readonly uid: number;

  @IsNotEmpty()
  @IsString()
  eventStart: Date;

  @IsNotEmpty()
  @IsString()
  eventEnd: Date;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly background: string;
}
