import { Test, TestingModule } from '@nestjs/testing';
import { SocialCredentialService } from './social-credential.service';

describe('SocialCredentialService', () => {
  let service: SocialCredentialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialCredentialService],
    }).compile();

    service = module.get<SocialCredentialService>(SocialCredentialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
