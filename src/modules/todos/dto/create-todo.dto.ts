import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateTodoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly priority: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly deadline: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly background: string;
}
