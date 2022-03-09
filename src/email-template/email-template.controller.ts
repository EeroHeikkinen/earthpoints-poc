import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Render,
} from '@nestjs/common';
import { CreateEmailContentTemplateDto } from './dto/email-content-template.dto';
import { UpdateEmailContentTemplateDto } from './dto/update-email-content-template.dto';
import { EmailTemplateService } from './email-template.service';

@Controller('email-template')
export class EmailTemplateController {
  constructor(private emailTemplateService: EmailTemplateService) {}

  @Get('/')
  @Render('manage-templates')
  index() {
    return {
      user: {},
      summedPoints: 0,
      events: [],
      platforms: [],
    };
  }

  @Post()
  create(@Body() createEmailContentTemplateDto: CreateEmailContentTemplateDto) {
    return this.emailTemplateService.addEmailContentTemplate(
      createEmailContentTemplateDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailContentTemplateDto: UpdateEmailContentTemplateDto,
  ) {
    return this.emailTemplateService.updateEmailContentTemplate(
      updateEmailContentTemplateDto,
    );
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.emailTemplateService.getEmailContentTemplate(key);
  }
}
