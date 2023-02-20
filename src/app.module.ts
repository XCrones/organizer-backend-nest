import { SequalizeConfigService } from './config/sequalizeConfig.service';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config';
import { TodosModule } from './todos/todos.module';
import { CalendarModule } from './calendar/calendar.module';
import { UsersModule } from './users/users.module';
import appConfig from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequalizeConfigService,
    }),
    TodosModule,
    CalendarModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
