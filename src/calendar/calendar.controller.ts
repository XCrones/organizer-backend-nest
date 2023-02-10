import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateCalendarEventDto } from './dto/update-event.dto';
import { CreateCalendarEventDto } from './dto/create-event.dto';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getEvents() {
    return this.calendarService.getEvents();
  }

  @Get(':id')
  getOneEvent(@Param('id') id: string) {
    return this.calendarService.getOneEvent(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createEvent(@Body() createEventDto: CreateCalendarEventDto) {
    return this.calendarService.createEvent(createEventDto);
  }

  @Patch(':id')
  updateEvent(
    @Body() updateEventDto: UpdateCalendarEventDto,
    @Param('id') id: string,
  ) {
    return this.calendarService.updateEvent(updateEventDto, id);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.calendarService.deleteEvent(id);
  }
}
