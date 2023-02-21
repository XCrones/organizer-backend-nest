import { JwtAuthGuard } from './../../guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserDTO })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() dto: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserDTO> {
    const user = request.user;
    return this.usersService.updateUser(user.email, dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: HttpStatus.OK, type: Boolean })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.usersService.deleteUser(user.email);
  }
}
