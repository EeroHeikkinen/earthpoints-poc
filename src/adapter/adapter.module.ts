import { Module } from '@nestjs/common';
import { FacebookService } from 'src/facebook/facebook.service';
import { RuleService } from 'src/rule/rule.service';
import { FacebookAdapter } from './impl/facebook.adapter';
import { AdapterService } from './adapter.service';
import { RuleModule } from 'src/rule/rule.module';
import { FacebookModule } from 'src/facebook/facebook.module';
import { InstagramAdapter } from './impl/instagram.adapter';
import { TwitterAdapter } from './impl/twitter.adapter';

@Module({ 
  imports: [RuleModule, FacebookModule],
  providers: [AdapterService, FacebookAdapter, InstagramAdapter, TwitterAdapter],
  exports: [AdapterService]
})
export class AdapterModule {}
 