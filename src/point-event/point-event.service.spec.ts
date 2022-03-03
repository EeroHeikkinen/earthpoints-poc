import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventRepository } from './point-event.repository';
import { PointEventService } from './point-event.service';

describe('PointEventService', () => {
  let service: PointEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointEventService, PointEventRepository],
      imports: [CassandraModule]
    }).compile();

    service = module.get<PointEventService>(PointEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
