import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { FacebookApiModule } from 'src/facebook-api/facebook-api.module';
import { InstagramApiModule } from 'src/instagram-api/instagram-api.module';
import { RuleModule } from 'src/rule/rule.module';
import { FacebookExtractor } from './extractors/facebook.extractor';
import { InstagramExtractor } from './extractors/instagram.extractor';
import { TwitterExtractor } from './extractors/twitter.extractor';
import { PlatformConnectionRepository } from './platform-connection.repository';
import { PlatformConnectionService } from './platform-connection.service';

describe('SocialCredentialService', () => {
  let service: PlatformConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformConnectionService, PlatformConnectionRepository, FacebookExtractor, InstagramExtractor, TwitterExtractor],
      imports: [CassandraModule, FacebookApiModule, InstagramApiModule, RuleModule],
    }).compile();

    service = module.get<PlatformConnectionService>(PlatformConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
