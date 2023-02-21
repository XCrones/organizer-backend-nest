import { UpdateTodoDTO } from './dto/update-todo.dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoResponse } from './response/todo.respose';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<TodoResponse> })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get()
  getTodos(): Promise<TodoResponse[]> {
    return this.todosService.getTodos();
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneTodo(@Param('id') id: string): Promise<TodoResponse> {
    return this.todosService.getOneTodo(id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.CREATED, type: TodoResponse })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDTO): Promise<TodoResponse> {
    return this.todosService.createTodo(createTodoDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateTodo(
    @Body() updateTodoDto: UpdateTodoDTO,
    @Param('id') id: string,
  ): Promise<TodoResponse> {
    return this.todosService.updateTodo(updateTodoDto, id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<TodoResponse> {
    return this.todosService.deleteTodo(id);
  }
}
