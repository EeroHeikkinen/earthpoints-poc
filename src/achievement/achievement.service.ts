import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookService } from 'src/facebook/facebook.service';
import { PointEvent } from './point-event.model';
import { AchievementRepository } from './achievement.repository';
import { RuleService } from 'src/rule/rule.service';

@Injectable()
export class AchievementService {
    constructor(
        private achievementRepository: AchievementRepository,
        private facebookService: FacebookService,
        private ruleService: RuleService
        ){}

    async getAchievements(facebookId) {
        const achievements = await this.calculateAchievements(facebookId);
        return achievements;
        //return this.achievementRepository.getAchievements(facebookId);
    }

    // TODO: if user's data is still processing and server crashes
    // we need to retrieve their oldest history again
    // Maybe persist the last url to database, and do a check once there is no next page anymore (final page processed)
    async calculateAchievements(facebookId) {
        //const feedContent = await this.facebookService.getFeed(facebookId);

        let achievements: Array<PointEvent> = []
        //for(var i in feedContent) {
        //    const item = feedContent[i];
            //this.ruleService.trigger('facebook.feeditem', processFeedItem(item)
            /*if(!item.message || (item.message.indexOf('oon')==-1)) {
                continue;
            }
            const achievement: Achievement = {
                facebookId: facebookId,
                email: 'temp',
                points: 3,
                timestamp: new Date(item.created_time),
                eventType: 'posted_with_oon',
                sourceEndpoint: '',
                objectType: 'post',
                objectUrl: item.message
            }
            achievements.push(achievement);*/
       // }
        return achievements;
    } 

    async processFeedItem(item) {
        if(item.status_type == 'shared_story') {
            this.ruleService.trigger('user.published.share.facebook', { platform: 'facebook', data: item })
        } else {
            this.ruleService.trigger('user.published.post.facebook', { platform: 'facebook', data: item })
        }
    }

    async getEarthPoints(facebookId) {
        const achievements = await this.getAchievements(facebookId)
        if(achievements.length == 0) {
            return 0;
        }
        return achievements.map((a)=>{ return a.points; }).reduce((a,b) => a+b)
    }

    async addAchievement(achievement: PointEvent) {
        return this.achievementRepository.addAchievement(achievement);
    }
}