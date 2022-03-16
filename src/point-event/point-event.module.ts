import { forwardRef, Module } from '@nestjs/common';
import { PointEventService } from './point-event.service';
import { PointEventController } from './point-event.controller';
import { PointEventRepository } from './point-event.repository';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { UserModule } from 'src/user/user.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [CassandraModule,KafkaModule],
  controllers: [PointEventController],
  providers: [PointEventService, PointEventRepository],
  exports: [PointEventService]
})
export class PointEventModule {}
