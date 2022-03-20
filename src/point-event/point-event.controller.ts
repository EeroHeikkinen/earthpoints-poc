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
import { ApiOAuth2 } from '@nestjs/swagger';

@Controller('point-event')
export class PointEventController {
  constructor(private readonly pointEventService: PointEventService) {}

  @Get()
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  findAll() {
    return this.pointEventService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  findOne(@Param('id') id: string) {
    return this.pointEventService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  update(
    @Param('id') id: string,
    @Body() updatePointEventDto: UpdatePointEventDto,
  ) {
    return this.pointEventService.update(+id, updatePointEventDto);
  }

  @Delete(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOAuth2([])
  remove(@Param('id') id: string) {
    return this.pointEventService.remove(+id);
  }
}
