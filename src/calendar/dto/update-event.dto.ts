import { IsNotEmpty } from 'class-validator';

export class UpdateCalendarEventDto {
  @IsNotEmpty()
  readonly uid: number;

  @IsNotEmpty()
  readonly year: number;

  @IsNotEmpty()
  readonly month: number;

  @IsNotEmpty()
  readonly day: number;

  @IsNotEmpty()
  readonly timeStart: string;

  @IsNotEmpty()
  readonly timeEnd: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly color: string;

  @IsNotEmpty()
  readonly background: string;
}
