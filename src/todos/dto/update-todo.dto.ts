import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsNumber()
  readonly priority: number;

  @IsNotEmpty()
  @IsString()
  readonly deadline: Date;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

  @IsNotEmpty()
  @IsString()
  readonly background: string;
}
