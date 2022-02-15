import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { SocialCredential } from 'src/social-credential/entities/social-credential.entity';

@Injectable()
export class FacebookExtractor implements IExtractor {
    constructor(
        private facebookApiService: FacebookApiService,
        private ruleService: RuleService
        ){}

    async extractEvents(credential: SocialCredential) {
        const feedContent = await this.facebookApiService.getFeed(credential.authToken, credential.profileId);
        const userid = credential.userid;

        for(var i in feedContent) {
            const item = feedContent[i];
            if(item.created_time) {
                item.timestamp = new Date(item.created_time)
            }
            switch(item.status_type) {
                case 'shared_story':
                    await this.ruleService.trigger('user.published.share', {  'userid': userid, 'platform': 'facebook', message: item.message, data: item })
                    break;
    
                case 'added_video':
                    await this.ruleService.trigger('user.published.post.video', {  'userid': userid, 'platform': 'facebook', message: item.message, data: item })
                    break;

                case 'added_photos':
                    await this.ruleService.trigger('user.published.post.photo', {  'userid': userid, 'platform': 'facebook', message: item.message, data: item })
                    break;
                    
                case 'mobile_status_update':
                default:
                    await this.ruleService.trigger('user.published.post', {  'userid': userid, 'platform': 'facebook', message: item.message, data: item })
                    break;
            }
        }  
    }  
}