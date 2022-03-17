import { Test, TestingModule } from '@nestjs/testing';
import { CanvasService } from './canvas.service';

describe('CanvasService', () => {
  let service: CanvasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanvasService],
      imports: []
    }).compile();

    service = module.get<CanvasService>(CanvasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate badges for a large number of requests', () => {
    expect(service).toBeDefined();
    for (let i = 0; i < 1000; i++) {
      service.createStatusBadgeCached(
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 10),
        '',
        '',
      );
    }
  });
});
