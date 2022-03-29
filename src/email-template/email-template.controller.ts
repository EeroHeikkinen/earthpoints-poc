import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateEmailContentTemplateDto } from './dto/email-content-template.dto';
import { EmailTemplateService } from './email-template.service';
import handlebars from 'handlebars';
@Controller('email-template')
export class EmailTemplateController {
  constructor(private emailTemplateService: EmailTemplateService) {}

  private previewContext = {
    points: 100,
    pointsEarnedToday: 20,
    firstName: 'Shankaran',
    footerImage: `${process.env.BASE_URL}/point-badge?point=20&total=100`,
    unsubscribeUrl: `${process.env.BASE_URL}/unsubscribe/2b46997f-4eb5-4010-a774-229f102b97ea`,
  };

  @Get('/')
  @Render('edit-templates-by-day')
  async index(@Req() request: Request) {
    request.app.locals.layout = 'admin';
    return {
      dayData: await this.buildListOfDaysWithData(),
    };
  }

  @Render('edit-templates-by-day')
  @Post(':day')
  async create(
    @Req() request: Request,
    @Param('day') day: string,
    @Query('type') type: string,
    @Body() createEmailContentTemplateDto: CreateEmailContentTemplateDto,
  ) {
    await this.emailTemplateService.addEmailContentTemplate(
      createEmailContentTemplateDto,
    );

    return this.getContextForDayAndType(day, type);
  }

  @Render('edit-templates-by-day')
  @Get(':day')
  async editByDay(
    @Req() request: Request,
    @Param('day') day: string,
    @Query('type') type: string,
  ) {
    request.app.locals.layout = 'admin';

    if (!type) {
      type = 'daily';
    }

    return await this.getContextForDayAndType(day, type);
  }

  async buildListOfDaysWithData() {
    const allTemplates =
      await this.emailTemplateService.getAllEmailContentTemplates();
    const days = allTemplates.map((template) =>
      template.key.split('-').slice(-3).join('-'),
    );
    const count = {};
    for (const day of days) {
      if (count[day]) {
        count[day] += 1;
      } else {
        count[day] = 1;
      }
    }
    return JSON.stringify(count);
  }

  async getContextForDayAndType(day, type) {
    const key = type + '-' + day;

    const emailContentTemplate =
      await this.emailTemplateService.getEmailContentTemplate(key);

    let previewHTML;
    if (emailContentTemplate) {
      previewHTML = handlebars.compile(emailContentTemplate.content)(
        this.previewContext,
      );
    }

    let templateTypes = [
      {
        displayName: 'Daily Email (Points gained)',
        id: 'daily',
      },
      {
        displayName: 'Daily Email (No points gained)',
        id: 'no-points-daily',
      },
    ];
    templateTypes = templateTypes.map((templateType) => {
      return {
        ...templateType,
        active: templateType.id == type,
      };
    });

    const [_year, _month, _day] = day.split('-');
    const reversedDay = _day + '/' + _month + '/' + _year;

    const dayData = await this.buildListOfDaysWithData();

    return {
      day,
      reversedDay,
      type,
      key,
      template: emailContentTemplate,
      templateTypes,
      previewHTML,
      dayData,
    };
  }
}
