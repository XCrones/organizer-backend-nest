import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAll() {
    return this.todosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todosService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Patch(':id')
  updatePost(@Body() updateTodoDto: UpdateTodoDto, @Param('id') id: string) {
    return this.todosService.updateTodo(updateTodoDto, id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}
