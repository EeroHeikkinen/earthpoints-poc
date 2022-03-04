import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueConsumer } from './queue.consumer';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sync',
    }),
    forwardRef(() => UserModule),
  ],
  providers: [QueueService, QueueConsumer],
  exports: [QueueService, QueueConsumer],
})
export class QueueModule {}
