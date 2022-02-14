import { Module } from '@nestjs/common';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { FacebookAdapter } from './impl/facebook.adapter';
import { AdapterService } from './adapter.service';
import { RuleModule } from 'src/rule/rule.module';
import { FacebookApiModule } from 'src/facebook-api/facebook-api.module';
import { InstagramAdapter } from './impl/instagram.adapter';
import { TwitterAdapter } from './impl/twitter.adapter';

@Module({ 
  imports: [RuleModule, FacebookApiModule],
  providers: [AdapterService, FacebookAdapter, InstagramAdapter, TwitterAdapter],
  exports: [AdapterService]
})
export class AdapterModule {}
 