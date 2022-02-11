import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookService } from 'src/facebook/facebook.service';
import { RuleService } from 'src/rule/rule.service';
import { IPlatformAdapter } from 'src/interfaces/platform-adapter.interface';
import { SocialCredential } from 'src/social-credential/entities/social-credential.entity';

@Injectable()
export class FacebookAdapter implements IPlatformAdapter {
    constructor(
        private facebookService: FacebookService,
        private ruleService: RuleService
        ){}

    async syncUser(credential: SocialCredential) {
        const feedContent = await this.facebookService.getFeed(credential.authToken, credential.profileId);
        const userid = credential.userid;

        for(var i in feedContent) {
            const item = feedContent[i];
            if(item.created_time) {
                item.timestamp = new Date(item.created_time)
            }
            await this.ruleService.trigger('user.published', { 'userid': userid, 'platform': 'facebook', message: item.message, data: item } );
            await this.processFeedItem(item, userid);
        }  
    }  

    private async processFeedItem(item, userid) {
        if(item.status_type == 'shared_story') {
            await this.ruleService.trigger('user.published.share', {  'userid': userid, 'platform': 'facebook', message: item.message, data: item })
        } else {
            await this.ruleService.trigger('user.published.post', {  'userid': userid, 'platform': 'facebook', message: item.message, data: item })
        }
    }
}