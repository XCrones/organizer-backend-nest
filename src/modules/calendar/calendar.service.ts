import { Injectable } from '@nestjs/common';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Calendar } from './models/calendar.model';
import { CalendarResponse } from './response/calendar.response';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar) private eventRepository: typeof Calendar,
  ) {}

  async getEvents(): Promise<CalendarResponse[]> {
    return (await this.eventRepository.findAll()) as CalendarResponse[];
  }

  async getOneEvent(id: string): Promise<CalendarResponse> {
    return (await this.eventRepository.findOne({
      where: {
        id,
      },
    })) as CalendarResponse;
  }

  async createEvent(dto: CreateEventDTO): Promise<CalendarResponse> {
    const event = new Calendar();
    Object.assign(event, dto);
    return (await event.save()) as CalendarResponse;
  }

  async deleteEvent(id: string): Promise<CalendarResponse> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
    });
    await event.destroy();
    return event as CalendarResponse;
  }

  async updateEvent(
    dto: UpdateEventDTO,
    id: string,
  ): Promise<CalendarResponse> {
    const result = await this.eventRepository.update(
      { ...dto },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    const [count, item] = result;
    const payload = item[0] as CalendarResponse;
    return payload;
  }
}
