import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Req,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateEmailContentTemplateDto } from './dto/email-content-template.dto';
import { UpdateEmailContentTemplateDto } from './dto/update-email-content-template.dto';
import { EmailTemplateService } from './email-template.service';
import handlebars from 'handlebars';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedExceptionFilter } from 'src/auth/unauthorized-exception.filter';

@Controller('email-template')
export class EmailTemplateController {
  constructor(private emailTemplateService: EmailTemplateService) {}

  private previewContext = {
    points: 100,
    pointsEarnedToday: 20,
    firstName: 'Shankaran',
    footerImage: `${process.env.BASE_URL}/point-badge?point=20&total=100`,
  };


  @Get('/login')
  async loginForm(@Req() request: Request) {
    request.app.locals.layout = 'admin';
  }

  @Post('/')
  async processLogin(@Req() request: Request) {
    request.app.locals.layout = 'admin';
  }

  @Get('/')
  @Render('edit-template')
  index(@Req() request: Request) {
    request.app.locals.layout = 'admin';
  }

  @Render('edit-template')
  @Post(':key')
  async create(
    @Req() request: Request,
    @Param('key') key: string,
    @Body() createEmailContentTemplateDto: CreateEmailContentTemplateDto,
  ) {
    await this.emailTemplateService.addEmailContentTemplate(
      createEmailContentTemplateDto,
    );

    const emailContentTemplate =
      await this.emailTemplateService.getEmailContentTemplate(key);

    request.app.locals.layout = 'admin';
    const previewHTML = handlebars.compile(emailContentTemplate.content)(
      this.previewContext,
    );

    return {
      requestKey: createEmailContentTemplateDto.key,
      template: emailContentTemplate,
      previewHTML,
    };
  }

  @Render('edit-template')
  @Get(':key')
  async findOne(@Req() request: Request, @Param('key') key: string) {
    request.app.locals.layout = 'admin';
    const emailContentTemplate =
      await this.emailTemplateService.getEmailContentTemplate(key);

    let previewHTML;
    if (emailContentTemplate) {
      previewHTML = handlebars.compile(emailContentTemplate.content)(
        this.previewContext,
      );
    }

    return {
      requestKey: key,
      template: emailContentTemplate,
      previewHTML,
    };
  }
}
