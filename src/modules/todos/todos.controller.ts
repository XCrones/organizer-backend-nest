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
  @HttpCode(HttpStatus.OK)
  @Get()
  getTodos(): Promise<TodoResponse[]> {
    return this.todosService.getTodos();
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOneTodo(@Param('id') id: string): Promise<TodoResponse> {
    return this.todosService.getOneTodo(id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.CREATED, type: TodoResponse })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createTodo(@Body() createTodoDto: CreateTodoDTO): Promise<TodoResponse> {
    return this.todosService.createTodo(createTodoDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateTodo(
    @Body() updateTodoDto: UpdateTodoDTO,
    @Param('id') id: string,
  ): Promise<TodoResponse> {
    return this.todosService.updateTodo(updateTodoDto, id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTodo(@Param('id') id: string): Promise<TodoResponse> {
    return this.todosService.deleteTodo(id);
  }
}
