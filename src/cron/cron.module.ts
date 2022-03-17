import { Module } from '@nestjs/common';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { QueueModule } from 'src/queue/queue.module';
import { UserModule } from 'src/user/user.module';
import { CronService } from './cron.service';

@Module({
  imports: [
    UserModule,
    PlatformConnectionModule,
    QueueModule,
    PointEventModule,
  ],
  providers: [CronService],
})
export class CronModule {}
