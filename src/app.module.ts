import { SequalizeConfigService } from './config/sequalizeConfig.service';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config';
import appConfig from './config';
import { TodosModule } from './modules/todos/todos.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { UsersModule } from './modules/users/users.module';

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
