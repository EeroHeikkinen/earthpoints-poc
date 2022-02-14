import { Injectable } from '@nestjs/common';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { IPlatformAdapter } from 'src/interfaces/platform-adapter.interface';
import { RuleService } from 'src/rule/rule.service';
import { FacebookAdapter } from './impl/facebook.adapter';
import { InstagramAdapter } from './impl/instagram.adapter';
import { TwitterAdapter } from './impl/twitter.adapter';

@Injectable()
export class AdapterService {
    constructor(
        private facebookAdapter: FacebookAdapter,
        private instagramAdapter: InstagramAdapter,
        private twitterAdapter: TwitterAdapter,
        private ruleService: RuleService
        ){}

    findOne(platform: string) {
        if(platform == 'facebook') {
            return this.facebookAdapter;
        } else if(platform == 'instagram') {
            return this.instagramAdapter;
        } else if(platform == 'twitter') {
            return this.twitterAdapter
        }
        throw new Error('Could not find adapter for platform: ' + platform)
    }

    getAll() {

    }
}
  