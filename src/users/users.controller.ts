import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getTodos() {
    // return this.todosService.getTodos();
  }

  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    // return this.todosService.getOneTodo(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createTodo(@Body() dto: CreateUserDto) {
    // return this.todosService.createTodo(createTodoDto);
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  updateTodo(@Body() dto: UpdateUserDto, @Param('id') id: number) {
    // return this.todosService.updateTodo(updateTodoDto, id);
    return this.usersService.updateUser(dto, id);
  }
}
