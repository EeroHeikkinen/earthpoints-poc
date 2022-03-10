import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { PointEventService } from './point-event.service';
import { CreatePointEventDto } from './dto/create-point-event.dto';
import { UpdatePointEventDto } from './dto/update-point-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { AdminOnlyGuard } from 'src/auth/admin-only.guard';
import crypto from 'crypto';

@Controller('point-event')
export class PointEventController {
  constructor(
    private readonly authService: AuthService,
    private readonly pointEventService: PointEventService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createPointEventDto: CreatePointEventDto) {
    return this.pointEventService.create(createPointEventDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminOnlyGuard)
  findAll() {
    return this.pointEventService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminOnlyGuard)
  findOne(@Param('id') id: string) {
    return this.pointEventService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminOnlyGuard)
  update(
    @Param('id') id: string,
    @Body() updatePointEventDto: UpdatePointEventDto,
  ) {
    return this.pointEventService.update(+id, updatePointEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminOnlyGuard)
  remove(@Param('id') id: string) {
    return this.pointEventService.remove(+id);
  }
}
