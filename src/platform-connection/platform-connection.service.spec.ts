import { Test, TestingModule } from '@nestjs/testing';
import { PlatformConnectionService } from './platform-connection.service';

describe('SocialCredentialService', () => {
  let service: PlatformConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformConnectionService],
    }).compile();

    service = module.get<PlatformConnectionService>(PlatformConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
