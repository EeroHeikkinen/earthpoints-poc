import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { SocialCredentialRepository } from './social-credential.repository';
import { SocialCredentialService } from './social-credential.service';

describe('SocialCredentialService', () => {
  let service: SocialCredentialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialCredentialService, SocialCredentialRepository],
      imports: [CassandraModule],
    }).compile();

    service = module.get<SocialCredentialService>(SocialCredentialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
