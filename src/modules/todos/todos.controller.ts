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
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoResponse } from './response/todo.respose';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UserDTO } from '../auth/dto/user.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<TodoResponse> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get()
  getTodos(@Req() request): Promise<TodoResponse[]> {
    const user: UserDTO = request.user;
    return this.todosService.getTodos(user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneTodo(@Param('id') id: string, @Req() request): Promise<TodoResponse> {
    const user: UserDTO = request.user;
    return this.todosService.getOneTodo(+id, user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.CREATED, type: TodoResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDTO,
    @Req() request,
  ): Promise<TodoResponse> {
    const user: UserDTO = request.user;
    console.log(user);
    return this.todosService.createTodo(createTodoDto, user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Patch()
  updateTodo(
    @Body() updateTodoDto: UpdateTodoDTO,
    @Req() request,
  ): Promise<TodoResponse> {
    const user: UserDTO = request.user;
    return this.todosService.updateTodo(updateTodoDto, user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: TodoResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Req() request): Promise<TodoResponse> {
    const user: UserDTO = request.user;
    return this.todosService.deleteTodo(+id, user.id);
  }
}
