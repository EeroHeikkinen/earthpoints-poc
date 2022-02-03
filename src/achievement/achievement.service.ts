import { Injectable } from '@nestjs/common';
import { FacebookService } from 'src/facebook/facebook.service';
import { Achievement } from './achievement.model';
import { AchievementRepository } from './achievement.repository';

@Injectable()
export class AchievementService {
    constructor(
        private achievementRepository: AchievementRepository,
        private facebookService: FacebookService
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
        const feedContent = await this.facebookService.getFeed(facebookId);

        let achievements: Array<Achievement> = []
        for(var i in feedContent) {
            const item = feedContent[i];
            if(!item.message || (item.message.indexOf('#luontokuva')==-1)) {
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
            achievements.push(achievement);
        }
        return achievements;
    } 

    async getEarthPoints(facebookId) {
        const achievements = await this.getAchievements(facebookId)
        return achievements.map((a)=>{ return a.points; }).reduce((a,b) => a+b)
    }

    async addAchievement(achievement: Achievement) {
        return this.achievementRepository.addAchievement(achievement);
    }
}