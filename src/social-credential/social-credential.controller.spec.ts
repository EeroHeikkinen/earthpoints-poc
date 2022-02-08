import { Test, TestingModule } from '@nestjs/testing';
import { SocialCredentialController } from './social-credential.controller';
import { SocialCredentialService } from './social-credential.service';

describe('SocialCredentialController', () => {
  let controller: SocialCredentialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialCredentialController],
      providers: [SocialCredentialService],
    }).compile();

    controller = module.get<SocialCredentialController>(SocialCredentialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
