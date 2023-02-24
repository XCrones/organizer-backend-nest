import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { TodosDTO } from './todos.dto';

export class UpdateTodoDTO extends TodosDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
