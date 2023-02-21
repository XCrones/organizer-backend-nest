import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}

  async getTodos() {
    return await this.todoRepository.findAll();
  }

  async getOneTodo(id: string) {
    return await this.todoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    const todo = new Todo();
    Object.assign(todo, createTodoDto);
    return await todo.save();
  }

  async deleteTodo(id: string) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
    });
    await todo.destroy();
    return todo;
  }

  async updateTodo(updateTodoDto: UpdateTodoDto, id: string) {
    return await this.todoRepository.update(
      { ...updateTodoDto },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
  }
}
