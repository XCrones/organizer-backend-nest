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
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateEventDTO } from './dto/update-event.dto';
import { CreateEventDTO } from './dto/create-event.dto';
import { CalendarService } from './calendar.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CalendarResponse } from './response/calendar.response';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UserDTO } from '../auth/dto/user.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Array<CalendarResponse> })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get()
  getEvents(@Req() request): Promise<CalendarResponse[]> {
    const user: UserDTO = request.user;
    return this.calendarService.getEvents(user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: CalendarResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneEvent(
    @Param('id') id: string,
    @Req() request,
  ): Promise<CalendarResponse> {
    const user: UserDTO = request.user;
    return this.calendarService.getOneEvent(+id, user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: CalendarResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createEvent(
    @Body() createEventDto: CreateEventDTO,
    @Req() request,
  ): Promise<CalendarResponse> {
    const user: UserDTO = request.user;
    return this.calendarService.createEvent(createEventDto, user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: CalendarResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Patch()
  updateEvent(
    @Body() updateEventDto: UpdateEventDTO,
    @Req() request,
  ): Promise<CalendarResponse> {
    const user: UserDTO = request.user;
    return this.calendarService.updateEvent(updateEventDto, user.id);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: CalendarResponse })
  @UseGuards(JwtAuthGuard)
  @Header('Content-type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteEvent(
    @Param('id') id: string,
    @Req() request,
  ): Promise<CalendarResponse> {
    const user: UserDTO = request.user;
    return this.calendarService.deleteEvent(+id, user.id);
  }
}
