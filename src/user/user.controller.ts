import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtGuard } from '../../src/auth/guard';
import { GetUser } from '../../src/decorator';
import { EditUserDto } from './dto';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  @Patch()
  editUser(@Body() dto: EditUserDto) {}
}
