import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { FacebookApiModule } from 'src/facebook-api/facebook-api.module';
import { InstagramApiModule } from 'src/instagram-api/instagram-api.module';
import { RuleModule } from 'src/rule/rule.module';
import { FacebookExtractor } from './extractors/facebook.extractor';
import { InstagramExtractor } from './extractors/instagram.extractor';
import { TwitterExtractor } from './extractors/twitter.extractor';
import { PlatformConnectionController } from './platform-connection.controller';
import { PlatformConnectionRepository } from './platform-connection.repository';
import { PlatformConnectionService } from './platform-connection.service';

describe('SocialCredentialController', () => {
  let controller: PlatformConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformConnectionController],
      providers: [PlatformConnectionService,PlatformConnectionRepository, FacebookExtractor, InstagramExtractor, TwitterExtractor],
      imports: [CassandraModule, FacebookApiModule, InstagramApiModule, RuleModule],
    }).compile();

    controller = module.get<PlatformConnectionController>(PlatformConnectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
