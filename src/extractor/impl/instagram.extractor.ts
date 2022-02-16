import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { SocialCredential } from 'src/social-credential/entities/social-credential.entity';
import { InstagramApiService } from 'src/instagram-api/instagram-api.service';

@Injectable()
export class InstagramExtractor implements IExtractor {
    constructor(
        private instagramService: InstagramApiService,
        private ruleService: RuleService
        ){}

        async extractEvents(credential: SocialCredential) {
            const feedContent = await this.instagramService.getFeed(credential.authToken);
            const userid = credential.userid;
    
            for(const item of feedContent) {
                if(item.timestamp) {
                    item.timestamp = new Date(item.timestamp)
                }
                await this.ruleService.trigger('user.published.post', { 'userid': userid, 'platform': 'instagram', message: item.caption, data: item } );
            }  
        }
}