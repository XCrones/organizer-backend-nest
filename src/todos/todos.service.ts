import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async getTodos() {
    return await this.todoModel.findAll();
  }

  async getOneTodo(id: string) {
    return await this.todoModel.findOne({
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
    const todo = await this.todoModel.findOne({
      where: {
        id,
      },
    });
    await todo.destroy();
    return;
  }

  async updateTodo(updateTodoDto: UpdateTodoDto, id: string) {
    return await this.todoModel.update(
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
