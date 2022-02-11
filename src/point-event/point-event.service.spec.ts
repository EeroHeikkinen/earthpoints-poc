import { Test, TestingModule } from '@nestjs/testing';
import { PointEventService } from './point-event.service';

describe('PointEventService', () => {
  let service: PointEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointEventService],
    }).compile();

    service = module.get<PointEventService>(PointEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
