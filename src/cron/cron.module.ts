import { Module } from '@nestjs/common';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { QueueModule } from 'src/queue/queue.module';
import { UserModule } from 'src/user/user.module';
import { CronCommand } from './cron.command';
import { CronService } from './cron.service';

@Module({
  imports: [UserModule, PlatformConnectionModule, QueueModule],
  providers: [CronService,CronCommand],
  exports: [CronCommand]
})
export class CronModule {}
