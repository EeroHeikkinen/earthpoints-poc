import { Injectable } from '@nestjs/common';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { RuleService } from 'src/rule/rule.service';
import { FacebookExtractor } from './impl/facebook.extractor';
import { InstagramExtractor } from './impl/instagram.extractor';
import { TwitterExtractor } from './impl/twitter.extractor';

@Injectable()
export class ExtractorService {
    constructor(
        private facebookExtractor: FacebookExtractor,
        private instagramExtractor: InstagramExtractor,
        private twitterExtractor: TwitterExtractor,
        private ruleService: RuleService
        ){}

    findOne(platform: string) {
        if(platform == 'facebook') {
            return this.facebookExtractor;
        } else if(platform == 'instagram') {
            return this.instagramExtractor;
        } else if(platform == 'twitter') {
            return this.twitterExtractor
        }
        throw new Error('Could not find adapter for platform: ' + platform)
    }

    getAll() {

    }
}
  