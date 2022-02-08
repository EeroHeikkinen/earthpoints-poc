import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialCredentialService } from './social-credential.service';
import { CreateSocialCredentialDto } from './dto/create-social-credential.dto';
import { UpdateSocialCredentialDto } from './dto/update-social-credentials.dto';

@Controller('social-credential')
export class SocialCredentialController {
  constructor(private readonly socialCredentialService: SocialCredentialService) {}

  @Post()
  create(@Body() createSocialCredentialDto: CreateSocialCredentialDto) {
    return this.socialCredentialService.create(createSocialCredentialDto);
  }

  @Get()
  findAll() {
    return this.socialCredentialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialCredentialService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateSocialCredentialDto: UpdateSocialCredentialDto) {
    return this.socialCredentialService.update(updateSocialCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialCredentialService.remove(+id);
  }
}
