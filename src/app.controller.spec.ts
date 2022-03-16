import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CanvasModule } from './canvas/canvas.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { CronModule } from './cron/cron.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { FacebookApiModule } from './facebook-api/facebook-api.module';
import { InstagramApiModule } from './instagram-api/instagram-api.module';
import { KafkaModule } from './kafka/kafka.module';
import { PlatformConnectionModule } from './platform-connection/platform-connection.module';
import { PointEventModule } from './point-event/point-event.module';
import { RuleModule } from './rule/rule.module';
import { TemplateModule } from './template/template.module';
import { UserModule } from './user/user.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'static'),
        }),
        AuthModule,
        CassandraModule,
        FacebookApiModule,
        UserModule,
        RuleModule,
        TemplateModule,
        PointEventModule,
        InstagramApiModule,
        ScheduleModule.forRoot(),
        CronModule,
        EmailTemplateModule,
        PlatformConnectionModule,
        CanvasModule,
        KafkaModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
