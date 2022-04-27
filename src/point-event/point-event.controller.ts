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
import { Request } from 'express'
import { UserService } from 'src/user/user.service';
import { AdminOnlyGuard } from 'src/auth/admin-only.guard';
import crypto from 'crypto';

@Controller('point-event')
export class PointEventController {
  constructor(private readonly pointEventService: PointEventService) {}

  /* TODO think about whether to keep this one 
  since it will create a lot of traffic 
  once we have say +1M events, 
  unless we add pagination*/
  @Get()
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.pointEventService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.pointEventService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  update(@Body() updatePointEventDto: UpdatePointEventDto) {
    return this.pointEventService.update(updatePointEventDto);
  }

  @Delete(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pointEventService.remove(+id);
  }
}
