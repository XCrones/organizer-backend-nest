import { TokenModule } from '../token/token.module';
import { AuthModule } from '../auth/auth.module';
import { SequalizeConfigService } from '../../config/sequalizeConfig.service';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '../../config';
import appConfig from '../../config';
import { TodosModule } from '../todos/todos.module';
import { CalendarModule } from '../calendar/calendar.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequalizeConfigService,
    }),
    TodosModule,
    CalendarModule,
    UsersModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
