import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookService } from 'src/facebook/facebook.service';
import { PointEvent } from '../../achievement/point-event.model';
import { AchievementRepository } from '../../achievement/achievement.repository';
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

        for(var i in feedContent) {
            const item = feedContent[i];
            await this.ruleService.trigger('user.published', { 'platform': 'facebook', message: item.message, data: item } );
            await this.processFeedItem(item);
        }  
    }  

    private async processFeedItem(item) {
        if(item.status_type == 'shared_story') {
            await this.ruleService.trigger('user.published.share', { 'platform': 'facebook', message: item.message, data: item })
        } else {
            await this.ruleService.trigger('user.published.post', { 'platform': 'facebook', message: item.message, data: item })
        }
    }
}