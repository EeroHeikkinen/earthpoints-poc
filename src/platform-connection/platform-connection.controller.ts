import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatformConnectionService } from './platform-connection.service';
import { CreatePlatformConnectionDto } from './dto/create-platform-connection.dto';
import { UpdatePlatformConnectionDto } from './dto/update-platform-connection.dto';

@Controller('platform-connection')
export class PlatformConnectionController {
  constructor(private readonly platformConnectionService: PlatformConnectionService) {}

  @Post()
  create(@Body() createSocialCredentialDto: CreatePlatformConnectionDto) {
    return this.platformConnectionService.create(createSocialCredentialDto);
  }

  @Get()
  findAll() {
    return this.platformConnectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformConnectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updatePlatformConnectionDto: UpdatePlatformConnectionDto) {
    return this.platformConnectionService.update(updatePlatformConnectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platformConnectionService.remove(+id);
  }
}
