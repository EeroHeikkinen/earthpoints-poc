import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointEventService } from './point-event.service';
import { CreatePointEventDto } from './dto/create-point-event.dto';
import { UpdatePointEventDto } from './dto/update-point-event.dto';

@Controller('point-event')
export class PointEventController {
  constructor(private readonly pointEventService: PointEventService) {}

  @Post()
  create(@Body() createPointEventDto: CreatePointEventDto) {
    return this.pointEventService.create(createPointEventDto);
  }

  @Get()
  findAll() {
    return this.pointEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointEventDto: UpdatePointEventDto) {
    return this.pointEventService.update(+id, updatePointEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointEventService.remove(+id);
  }
}
