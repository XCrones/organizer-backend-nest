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
import { UpdateEventDTO } from './dto/update-event.dto';
import { CreateEventDTO } from './dto/create-event.dto';
import { CalendarService } from './calendar.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalendarResponse } from './response/calendar.response';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<CalendarResponse> })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get()
  getEvents(): Promise<CalendarResponse[]> {
    return this.calendarService.getEvents();
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<CalendarResponse> })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneEvent(@Param('id') id: string): Promise<CalendarResponse> {
    return this.calendarService.getOneEvent(id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<CalendarResponse> })
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  @Post()
  createEvent(
    @Body() createEventDto: CreateEventDTO,
  ): Promise<CalendarResponse> {
    return this.calendarService.createEvent(createEventDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<CalendarResponse> })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateEvent(
    @Body() updateEventDto: UpdateEventDTO,
    @Param('id') id: string,
  ): Promise<CalendarResponse> {
    return this.calendarService.updateEvent(updateEventDto, id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<CalendarResponse> })
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteEvent(@Param('id') id: string): Promise<CalendarResponse> {
    return this.calendarService.deleteEvent(id);
  }
}
