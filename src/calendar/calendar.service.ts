import { Injectable } from '@nestjs/common';
import { CreateCalendarEventDto } from './dto/create-event.dto';
import { UpdateCalendarEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CalendarModel } from './models/calendar.model';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(CalendarModel) private eventModel: typeof CalendarModel,
  ) {}

  async getEvents() {
    return await this.eventModel.findAll();
  }

  async getOneEvent(id: string) {
    return await this.eventModel.findOne({
      where: {
        id,
      },
    });
  }

  async createEvent(createEventDto: CreateCalendarEventDto) {
    const event = new CalendarModel();
    Object.assign(event, createEventDto);
    return await event.save();
  }

  async deleteEvent(id: string) {
    const event = await this.eventModel.findOne({
      where: {
        id,
      },
    });
    await event.destroy();
    return;
  }

  async updateEvent(updateEventDto: UpdateCalendarEventDto, id: string) {
    return await this.eventModel.update(
      { ...updateEventDto },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
  }
}
