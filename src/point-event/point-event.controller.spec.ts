import { Test, TestingModule } from '@nestjs/testing';
import { PointEventController } from './point-event.controller';
import { PointEventService } from './point-event.service';

describe('PointEventController', () => {
  let controller: PointEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointEventController],
      providers: [PointEventService],
    }).compile();

    controller = module.get<PointEventController>(PointEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
