import { Injectable } from '@nestjs/common';
import { CreateCalendarEventDto } from './dto/create-event.dto';
import { UpdateCalendarEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Calendar } from './models/calendar.model';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar) private eventRepository: typeof Calendar,
  ) {}

  async getEvents() {
    return await this.eventRepository.findAll();
  }

  async getOneEvent(id: string) {
    return await this.eventRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createEvent(createEventDto: CreateCalendarEventDto) {
    const event = new Calendar();
    Object.assign(event, createEventDto);
    return await event.save();
  }

  async deleteEvent(id: string) {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
    });
    await event.destroy();
    return event;
  }

  async updateEvent(updateEventDto: UpdateCalendarEventDto, id: string) {
    return await this.eventRepository.update(
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
