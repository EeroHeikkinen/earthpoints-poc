import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { ExtractorModule } from 'src/extractor/extractor.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { SocialCredentialModule } from 'src/social-credential/social-credential.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
      imports: [SocialCredentialModule, ExtractorModule, CassandraModule, PointEventModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
