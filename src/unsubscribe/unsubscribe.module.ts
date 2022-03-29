import { forwardRef, Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { EmailTemplateModule } from 'src/email-template/email-template.module';
import { UnsubscribeController } from './unsubscribe.controller';
import { UnsubscribeService } from './unsubscribe.service';
import { UnsubscriptionRepository } from './unsubscription.repository';

@Module({
  imports: [
    CassandraModule,
    forwardRef(() => EmailTemplateModule)
  ],
  providers: [UnsubscribeService,UnsubscriptionRepository],
  controllers: [UnsubscribeController],
  exports: [UnsubscribeService]
})
export class UnsubscribeModule {}
