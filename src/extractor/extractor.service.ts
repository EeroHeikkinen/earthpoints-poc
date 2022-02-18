import { Injectable } from '@nestjs/common';
import { FacebookExtractor } from './impl/facebook.extractor';
import { InstagramExtractor } from './impl/instagram.extractor';
import { TwitterExtractor } from './impl/twitter.extractor';

@Injectable()
export class ExtractorService {
    constructor(
        private facebookExtractor: FacebookExtractor,
        private instagramExtractor: InstagramExtractor,
        private twitterExtractor: TwitterExtractor,
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
  