import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';
import { TodoResponse } from './response/todo.respose';
import { APP_ERRORS } from 'src/common/errors';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}

  async getTodos(uid: number): Promise<TodoResponse[]> {
    return (await this.todoRepository.findAll({
      where: { uid },
    })) as TodoResponse[];
  }

  async getOneTodo(id: number, uid: number): Promise<TodoResponse | undefined> {
    const todo = (await this.todoRepository.findOne({
      where: {
        id,
        uid,
      },
    })) as TodoResponse;

    if (todo) {
      return todo;
    }

    throw new BadRequestException(APP_ERRORS.TODO_NOT_FOUND);
  }

  async createTodo(dto: CreateTodoDTO, uid: number): Promise<TodoResponse> {
    const todo = new Todo();
    todo.uid = uid;
    Object.assign(todo, dto);
    return (await todo.save()) as TodoResponse;
  }

  async updateTodo(dto: UpdateTodoDTO, uid: number): Promise<TodoResponse> {
    const result = await this.todoRepository.update(
      { ...dto },
      {
        where: {
          id: dto.id,
          uid,
        },
        returning: true,
      },
    );

    const [count, item] = result;
    const payload = item[0] as TodoResponse;

    if (payload) {
      return payload;
    }

    throw new BadRequestException(APP_ERRORS.TODO_NOT_FOUND);
  }

  async deleteTodo(id: number, uid: number): Promise<TodoResponse> {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        uid,
      },
    });

    if (todo) {
      await todo.destroy();
      return todo as TodoResponse;
    }

    throw new BadRequestException(APP_ERRORS.TODO_NOT_FOUND);
  }
}
