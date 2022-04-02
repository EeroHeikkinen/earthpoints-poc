import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { QueueConsumer } from './queue.consumer';
import { UserModule } from 'src/user/user.module';
import { EmailTemplateModule } from 'src/email-template/email-template.module';
import { IshangamModule } from 'src/ishangam/ishangam.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sync',
    }),
    forwardRef(() => UserModule),
    EmailTemplateModule,
    IshangamModule
  ],
  providers: [QueueService, QueueConsumer],
  exports: [QueueService, QueueConsumer],
})
export class QueueModule {}
