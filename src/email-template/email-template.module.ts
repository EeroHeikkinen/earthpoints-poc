import dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { SentEmailRepository } from './sent-email.repository';
import { DailyMessageEmailTemplate } from './templates/daily-message.template';
import { FiftyPointsEmailTemplate } from './templates/n-points-reached.template';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { WelcomeMessageEmailTemplate } from './templates/welcome-message.template';
import { EmailTemplateController } from './email-template.controller';
import { EmailContentTemplateRepository } from './email-content-template.repository';

@Module({
  imports: [
    PointEventModule,
    CassandraModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/public/mail-templates/',
        adapter: new HandlebarsAdapter(
          {
            'encodeURIComponent': function(options: any){
              return encodeURIComponent(options.fn && options.fn(this));
            }
          }), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: process.env.PWD + '/public/mail-templates/partials',
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  providers: [
    EmailContentTemplateRepository,
    EmailTemplateService,
    SentEmailRepository,
    DailyMessageEmailTemplate,
    FiftyPointsEmailTemplate,
    WelcomeMessageEmailTemplate,
  ],
  exports: [EmailTemplateService],
  controllers: [EmailTemplateController],
})
export class EmailTemplateModule {}
