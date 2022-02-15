import { Module } from '@nestjs/common';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { FacebookExtractor } from './impl/facebook.extractor';
import { ExtractorService } from './extractor.service';
import { RuleModule } from 'src/rule/rule.module';
import { FacebookApiModule } from 'src/facebook-api/facebook-api.module';
import { InstagramExtractor } from './impl/instagram.extractor';
import { TwitterExtractor } from './impl/twitter.extractor';
import { InstagramApiModule } from 'src/instagram-api/instagram-api.module';

@Module({ 
  imports: [RuleModule, FacebookApiModule, InstagramApiModule],
  providers: [ExtractorService, FacebookExtractor, InstagramExtractor, TwitterExtractor],
  exports: [ExtractorService]
})
export class ExtractorModule {}
 