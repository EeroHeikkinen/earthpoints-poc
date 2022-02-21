import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueConsumer } from './queue.consumer';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sync',
    }),
  ],
  providers: [QueueService,QueueConsumer],
  exports: [QueueService,QueueConsumer]
})
export class QueueModule {}
