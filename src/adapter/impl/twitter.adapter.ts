import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookService } from 'src/facebook/facebook.service';
import { PointEvent } from '../../achievement/point-event.model';
import { AchievementRepository } from '../../achievement/achievement.repository';
import { RuleService } from 'src/rule/rule.service';
import { IPlatformAdapter } from 'src/interfaces/platform-adapter.interface';
import { SocialCredential } from 'src/social-credential/entities/social-credential.entity';

@Injectable()
export class TwitterAdapter implements IPlatformAdapter {
    constructor(
        //private facebookService: FacebookService,
        //private ruleService: RuleService
        ){}

    async syncUser(credential: SocialCredential) {
        return;
    }
}