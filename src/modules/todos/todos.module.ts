import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { Todo } from './models/todo.model';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
