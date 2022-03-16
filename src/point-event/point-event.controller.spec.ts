import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { PointEventController } from './point-event.controller';
import { PointEventRepository } from './point-event.repository';
import { PointEventService } from './point-event.service';

describe('PointEventController', () => {
  let controller: PointEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointEventService, PointEventRepository],
      controllers: [PointEventController],
      imports: [CassandraModule,KafkaModule],
    }).compile();

    controller = module.get<PointEventController>(PointEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
