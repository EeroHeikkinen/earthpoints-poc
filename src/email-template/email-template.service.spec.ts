import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { UnsubscribeModule } from 'src/unsubscribe/unsubscribe.module';
import { EmailTemplateModule } from './email-template.module';
import { EmailTemplateService } from './email-template.service';
import { SentEmailRepository } from './sent-email.repository';
import { DailyMessageEmailTemplate } from './templates/daily-message.template';
import { FiftyPointsEmailTemplate } from './templates/fifty-points-message.template';

describe('EmailTemplateService', () => {
  let service: EmailTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentEmailRepository,
        DailyMessageEmailTemplate,
        FiftyPointsEmailTemplate,
      ],
      imports: [
        PointEventModule,
        CassandraModule,
        MailerModule,
        EmailTemplateModule,
        forwardRef(()=>UnsubscribeModule),
      ],
    }).compile();

    service = module.get<EmailTemplateService>(EmailTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
