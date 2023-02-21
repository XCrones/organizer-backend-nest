import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';
import { TodoResponse } from './response/todo.respose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}

  async getTodos(): Promise<TodoResponse[]> {
    return (await this.todoRepository.findAll()) as TodoResponse[];
  }

  async getOneTodo(id: string): Promise<TodoResponse | undefined> {
    return (await this.todoRepository.findOne({
      where: {
        id,
      },
    })) as TodoResponse;
  }

  async createTodo(dto: CreateTodoDTO): Promise<TodoResponse> {
    const todo = new Todo();
    Object.assign(todo, dto);
    return (await todo.save()) as TodoResponse;
  }

  async deleteTodo(id: string): Promise<TodoResponse> {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });
    await todo.destroy();
    return todo as TodoResponse;
  }

  async updateTodo(dto: UpdateTodoDTO, id: string): Promise<TodoResponse> {
    const result = await this.todoRepository.update(
      { ...dto },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    const [count, item] = result;
    const payload = item[0] as TodoResponse;

    return payload;
  }
}
