require('dotenv').config()
import { Module } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { SentEmailRepository } from './sent-email.repository';
import { DailyMessageEmailTemplate } from './templates/daily-message.template';
import { FiftyPointsEmailTemplate } from './templates/fifty-points-message.template';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';

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
        pass: process.env.EMAIL_PASS // generated ethereal password
      },
    },
    defaults: {
      from: '"nest-modules" <user@outlook.com>', // outgoing email ID
    },
    template: {
      dir: process.cwd() + '/public/mail-templates/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter()
      options: {
        strict: true,
      },
    },
  })],
  providers: [EmailTemplateService, SentEmailRepository, DailyMessageEmailTemplate, FiftyPointsEmailTemplate],
  exports: [EmailTemplateService]
})
export class EmailTemplateModule {}
