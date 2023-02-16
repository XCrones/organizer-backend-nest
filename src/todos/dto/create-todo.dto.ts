import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  readonly priority: number;

  @IsNotEmpty()
  readonly deadline: Date;

  @IsNotEmpty()
  readonly status: boolean;

  @IsNotEmpty()
  readonly descritption: string;

  @IsNotEmpty()
  readonly background: string;
}
