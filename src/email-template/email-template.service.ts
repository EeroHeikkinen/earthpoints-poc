require('dotenv').config();
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IEmailTemplate } from 'src/interfaces/email-template.interface';
import { User } from 'src/user/entities/user.entity';
import { DailyMessageEmailTemplate } from './templates/daily-message.template';
import { MailerService } from '@nestjs-modules/mailer';
import { SentEmailRepository } from './sent-email.repository';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { FiftyPointsEmailTemplate } from './templates/fifty-points-message.template';
import { WelcomeMessageEmailTemplate } from './templates/welcome-message.template';
import { EmailContentTemplateRepository } from './email-content-template.repository';
import { CreateEmailContentTemplateDto } from './dto/email-content-template.dto';
import { UpdateEmailContentTemplateDto } from './dto/update-email-content-template.dto';
import handlebars from 'handlebars';
import { UnsubscribeService } from 'src/unsubscribe/unsubscribe.service';

@Injectable()
export class EmailTemplateService {
  templates: Map<string, IEmailTemplate>;
  constructor(
    private dailyMessageEmailTemplate: DailyMessageEmailTemplate,
    private fiftyPointsEmailTemplate: FiftyPointsEmailTemplate,
    private welcomeMessageEmailTemplate: WelcomeMessageEmailTemplate,
    private sentEmailRepository: SentEmailRepository,
    private emailContentTemplateRepository: EmailContentTemplateRepository,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => UnsubscribeService))
    private unsubscribeService: UnsubscribeService
  ) {
    this.templates = new Map<string, IEmailTemplate>(
      Object.entries({
        dailyMessage: dailyMessageEmailTemplate,
        welcomeMessage: welcomeMessageEmailTemplate,
        /*'fiftyPoints': fiftyPointsEmailTemplate*/
      }),
    );
  }

  async findAll() {
    return this.templates;
  }

  async addEmailContentTemplate(
    createEmailContentTemplateDto: CreateEmailContentTemplateDto,
  ) {
    return await this.emailContentTemplateRepository.addEmailContentTemplate(
      createEmailContentTemplateDto,
    );
  }

  async updateEmailContentTemplate(
    updateEmailContentTemplateDto: UpdateEmailContentTemplateDto,
  ) {
    return await this.emailContentTemplateRepository.updateEmailContentTemplate(
      updateEmailContentTemplateDto,
    );
  }

  async getEmailContentTemplate(key: string) {
    return await this.emailContentTemplateRepository.getEmailContentTemplateByKey(
      key,
    );
  }

  async getAllEmailContentTemplates() {
    return await this.emailContentTemplateRepository.getAllEmailContentTemplates();
  }

  getFrom() {
    return process.env.EMAIL_FROM || 'noreply@consciousplanet.org';
  }

  async processScheduled(user: User, timestamp: Date) {
    if(process.env.EMAIL_ENABLED !== '1') {
      console.log('E-Mails are disabled!'); 
      return;
    }
    /* Let's get the current time in user's local timezone */
    const timezone = user.timezone || 'Europe/Berlin';
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      timeZone: timezone,
    });
    const parts = formatter.formatToParts(timestamp);
    let hourInUserTimeZone: number, minutesInUserTimeZone: number;
    for (const part of parts) {
      if (part.type == 'hour') {
        hourInUserTimeZone = parseInt(part.value);
      }
      if (part.type == 'minute') {
        minutesInUserTimeZone = parseInt(part.value);
      }
    }

    for (const template of this.templates.values()) {
      const templateName = template.getName();

      if(await this.unsubscribeService.checkUnsubscription(user.userid,templateName)){
        console.log(`User is unsubscribed from ${template.getFullname()}`);
        continue;
      }

      const lastSent =
        await this.sentEmailRepository.getSentEmailByUserAndTemplateName(
          user.userid,
          templateName,
        );

      const renderParams = await template.render(user, {
        hourInUserTimeZone,
        minutesInUserTimeZone,
        contextTimestamp: timestamp,
        lastSent:
          lastSent && lastSent.length ? lastSent[0].timestamp : undefined,
      });

      if (renderParams) {
        if (renderParams.databaseTemplate) {
          const key = renderParams.databaseTemplate;
          const databaseTemplate =
            await this.emailContentTemplateRepository.getEmailContentTemplateByKey(
              key,
            );
          if (databaseTemplate && databaseTemplate.content) {
            delete renderParams.template;
            renderParams.html = handlebars.compile(databaseTemplate.content)(
              renderParams.context,
            );
          }
          if (databaseTemplate && databaseTemplate.subject) {
            renderParams.subject = handlebars.compile(databaseTemplate.subject)(
              renderParams.context,
            );
          }
        }

        if (!renderParams.template && !renderParams.html) {
          console.log(`No template found for ${renderParams.subject}`);
          continue;
        }

        await this.mailerService
          .sendMail({
            to: user.email,
            from: this.getFrom(),
            ...renderParams,
          })
          .then((success) => {
            console.log(success);
          })
          .catch((err) => {
            console.log(err);
          });

        await this.sentEmailRepository.addSentEmail({
          userid: user.userid,
          template: templateName,
          timestamp: new Date(),
        });
      }
    }
  }
}
