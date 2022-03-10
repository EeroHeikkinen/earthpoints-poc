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
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: Request,
    @Body() createPointEventDto: CreatePointEventDto,
  ) {
    if (!createPointEventDto.userid && createPointEventDto.email) {
      const { email } = createPointEventDto;
      const eventUser = await this.userService.findByEmail(email);
      if (!eventUser) {
        throw new BadRequestException(
          'Could not find user with email ' + email,
        );
      }
      createPointEventDto.userid = eventUser.userid;
    }

    await this.pointEventService.create(createPointEventDto);
    const userEvents = await this.pointEventService.findAllForUser(
      createPointEventDto.userid,
    );
    const hash =
      createPointEventDto.hash ||
      crypto
        .createHash('sha256')
        .update(createPointEventDto.hashString)
        .digest('base64');

    const userTotalPoints = userEvents
      .map((event) => event.points)
      .reduce((previous, current) => previous + current, 0);

    for (const event of userEvents) {
      if (event.hash == hash) {
        return {
          msg: 'Successfully created point event',
          event,
          userTotalPoints,
        };
      }
    }

    return {
      msg: 'Error retrieving created point event',
    };
  }

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
    return this.pointEventService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePointEventDto: UpdatePointEventDto,
  ) {
    return this.pointEventService.update(+id, updatePointEventDto);
  }

  @Delete(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pointEventService.remove(+id);
  }
}
