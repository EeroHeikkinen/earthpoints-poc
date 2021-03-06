import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { FacebookApiService } from './facebook-api.service';

describe('FacebookApiService', () => {
  let service: FacebookApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacebookApiService],
      imports: [HttpModule]
    }).compile();

    service = module.get<FacebookApiService>(FacebookApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
