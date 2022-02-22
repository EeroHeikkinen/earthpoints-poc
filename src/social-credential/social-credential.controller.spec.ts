import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { SocialCredentialController } from './social-credential.controller';
import { SocialCredentialRepository } from './social-credential.repository';
import { SocialCredentialService } from './social-credential.service';

describe('SocialCredentialController', () => {
  let controller: SocialCredentialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialCredentialController],
      providers: [SocialCredentialService, SocialCredentialRepository],
      imports: [CassandraModule],
    }).compile();

    controller = module.get<SocialCredentialController>(SocialCredentialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
