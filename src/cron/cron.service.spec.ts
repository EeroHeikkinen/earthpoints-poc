import { Test, TestingModule } from '@nestjs/testing';
import { FacebookApiModule } from 'src/facebook-api/facebook-api.module';
import { InstagramApiModule } from 'src/instagram-api/instagram-api.module';
import { RuleModule } from 'src/rule/rule.module';
import { ExtractorService } from './extractor.service';
import { FacebookExtractor } from './impl/facebook.extractor';
import { InstagramExtractor } from './impl/instagram.extractor';
import { TwitterExtractor } from './impl/twitter.extractor';

describe('AdapterService', () => {
  let service: ExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RuleModule, FacebookApiModule, InstagramApiModule],
      providers: [ExtractorService, FacebookExtractor, InstagramExtractor, TwitterExtractor],
    }).compile();

    service = module.get<ExtractorService>(ExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
