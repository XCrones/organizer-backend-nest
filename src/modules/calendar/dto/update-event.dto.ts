import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CalendarDTO } from './calendar.dto';

export class UpdateEventDTO extends CalendarDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
