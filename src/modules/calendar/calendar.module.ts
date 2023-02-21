import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Calendar } from './models/calendar.model';

@Module({
  imports: [SequelizeModule.forFeature([Calendar])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
