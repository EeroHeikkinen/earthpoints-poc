import { Test, TestingModule } from '@nestjs/testing';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { QueueModule } from 'src/queue/queue.module';
import { UserModule } from 'src/user/user.module';
import { CronModule } from './cron.module';
import { CronService } from './cron.service';

describe('CronService', () => {
  let service: CronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PlatformConnectionModule, QueueModule,CronModule],
      providers: []
    }).compile();

    service = module.get<CronService>(CronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
