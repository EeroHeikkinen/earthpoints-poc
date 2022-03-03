import { Test, TestingModule } from '@nestjs/testing';
import { PlatformConnectionController } from './platform-connection.controller';
import { PlatformConnectionService } from './platform-connection.service';

describe('SocialCredentialController', () => {
  let controller: PlatformConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformConnectionController],
      providers: [PlatformConnectionService],
    }).compile();

    controller = module.get<PlatformConnectionController>(PlatformConnectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
