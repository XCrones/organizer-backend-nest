import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Calendar } from './models/calendar.model';
import { CalendarResponse } from './response/calendar.response';
import { APP_ERRORS } from 'src/common/errors';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar) private eventRepository: typeof Calendar,
  ) {}

  async getEvents(uid: number): Promise<CalendarResponse[]> {
    return (await this.eventRepository.findAll({
      where: { uid },
    })) as CalendarResponse[];
  }

  async getOneEvent(id: number, uid: number): Promise<CalendarResponse> {
    const result = (await this.eventRepository.findOne({
      where: {
        id,
        uid,
      },
    })) as CalendarResponse;

    if (result) {
      return result;
    }

    throw new BadRequestException(APP_ERRORS.EVENT_NOT_FOUND);
  }

  async createEvent(
    dto: CreateEventDTO,
    uid: number,
  ): Promise<CalendarResponse> {
    const event = new Calendar();
    event.uid = uid;
    Object.assign(event, dto);
    return (await event.save()) as CalendarResponse;
  }

  async updateEvent(
    dto: UpdateEventDTO,
    uid: number,
  ): Promise<CalendarResponse> {
    const result = await this.eventRepository.update(
      { ...dto },
      {
        where: {
          id: dto.id,
          uid,
        },
        returning: true,
      },
    );
    const [count, item] = result;
    const payload = item[0] as CalendarResponse;

    if (payload) {
      return payload;
    }

    throw new BadRequestException(APP_ERRORS.EVENT_NOT_FOUND);
  }

  async deleteEvent(id: number, uid: number): Promise<CalendarResponse> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
        uid,
      },
    });

    if (event) {
      await event.destroy();
      return event as CalendarResponse;
    }

    throw new BadRequestException(APP_ERRORS.EVENT_NOT_FOUND);
  }
}
