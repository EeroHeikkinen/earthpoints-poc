import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { UnsubscribeController } from './unsubscribe.controller';
import { UnsubscribeService } from './unsubscribe.service';
import { UnsubscriptionRepository } from './unsubscription.repository';

@Module({
  imports: [CassandraModule],
  providers: [UnsubscribeService,UnsubscriptionRepository],
  controllers: [UnsubscribeController],
  exports: [UnsubscribeService]
})
export class UnsubscribeModule {}
