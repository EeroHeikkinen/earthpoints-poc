import { Controller, Get, Param } from '@nestjs/common';
import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
   constructor(private achievementService: AchievementService){}

    @Get('get/:facebookId') 
    async getAchievements(@Param('facebookId') facebookId): Promise<any> {
        return this.achievementService.getAchievements(facebookId)
    }
}
