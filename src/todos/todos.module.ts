import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { TodoModel } from './models/todo.model';

@Module({
  imports: [SequelizeModule.forFeature([TodoModel])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
