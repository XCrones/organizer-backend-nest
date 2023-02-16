import { IsNotEmpty } from 'class-validator';

export class CreateCalendarEventDto {
  @IsNotEmpty()
  readonly uid: number;

  @IsNotEmpty()
  eventStart: Date;

  @IsNotEmpty()
  eventEnd: Date;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly background: string;
}
