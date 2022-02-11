import { Module } from '@nestjs/common';
import { PointEventService } from './point-event.service';
import { PointEventController } from './point-event.controller';
import { PointEventRepository } from './point-event.repository';
import { CassandraModule } from 'src/cassandra/cassandra.module';

@Module({
  imports: [CassandraModule],
  controllers: [PointEventController],
  providers: [PointEventService, PointEventRepository],
  exports: [PointEventService]
})
export class PointEventModule {}
