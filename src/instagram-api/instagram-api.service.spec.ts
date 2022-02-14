import { Test, TestingModule } from '@nestjs/testing';
import { InstagramApiService } from './instagram-api.service';

describe('InstagramApiService', () => {
  let service: InstagramApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstagramApiService],
    }).compile();

    service = module.get<InstagramApiService>(InstagramApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
