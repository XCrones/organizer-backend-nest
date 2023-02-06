import { SequalizeConfigService } from './config/sequalizeConfig.service';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequalizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
