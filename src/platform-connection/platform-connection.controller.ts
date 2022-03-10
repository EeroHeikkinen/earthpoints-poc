import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlatformConnectionService } from './platform-connection.service';
import { CreatePlatformConnectionDto } from './dto/create-platform-connection.dto';
import { UpdatePlatformConnectionDto } from './dto/update-platform-connection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminOnlyGuard } from 'src/auth/admin-only.guard';

@Controller('platform-connection')
export class PlatformConnectionController {
  constructor(private readonly platformConnectionService: PlatformConnectionService) {}

  @Post()
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createSocialCredentialDto: CreatePlatformConnectionDto) {
    return this.platformConnectionService.create(createSocialCredentialDto);
  }

  @Get()
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.platformConnectionService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.platformConnectionService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  update(@Body() updatePlatformConnectionDto: UpdatePlatformConnectionDto) {
    return this.platformConnectionService.update(updatePlatformConnectionDto);
  }

  @Delete(':id')
  @UseGuards(AdminOnlyGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.platformConnectionService.remove(+id);
  }
}
