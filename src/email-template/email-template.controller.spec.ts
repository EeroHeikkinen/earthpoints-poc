import { MailerModule } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { EmailContentTemplateRepository } from './email-content-template.repository';
import { EmailTemplateController } from './email-template.controller';
import { EmailTemplateModule } from './email-template.module';
import { EmailTemplateService } from './email-template.service';
import { SentEmailRepository } from './sent-email.repository';
import { DailyMessageEmailTemplate } from './templates/daily-message.template';
import { FiftyPointsEmailTemplate } from './templates/fifty-points-message.template';
import { WelcomeMessageEmailTemplate } from './templates/welcome-message.template';

describe('EmailTemplateController', () => {
  let controller: EmailTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailContentTemplateRepository,
        EmailTemplateService,
        SentEmailRepository,
        DailyMessageEmailTemplate,
        FiftyPointsEmailTemplate,
        WelcomeMessageEmailTemplate,
      ],
      controllers: [EmailTemplateController],
      imports: [
        PointEventModule,
        CassandraModule,
        MailerModule,
        EmailTemplateModule,
      ],
    }).compile();

    controller = module.get<EmailTemplateController>(EmailTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
