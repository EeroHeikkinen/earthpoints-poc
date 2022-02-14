import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookService } from 'src/facebook/facebook.service';
import { RuleService } from 'src/rule/rule.service';
import { IPlatformAdapter } from 'src/interfaces/platform-adapter.interface';
import { SocialCredential } from 'src/social-credential/entities/social-credential.entity';
import { IPointRule } from 'src/interfaces/point-rule.interface';
import { stringify } from 'querystring';
import { PointEvent } from 'src/point-event/entities/point-event.entity';

import * as dotenv from "dotenv";
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
dotenv.config();

@Injectable()
export class DemoPostRule implements IPointRule {
    private hashkey = 'demopostrule';

    async process(eventName: any, item:any): Promise<false | CreatePointEventDto> {
        if(eventName.startsWith('user.published.post')) {
            if(item.message && item.message.toLowerCase().includes("#" + process.env.REWARD_HASHTAG.toLowerCase())) {
                var hashString = item.platform + item.data.id + this.hashkey;
                
                const pointEvent:CreatePointEventDto = {
                    hashString: hashString,
                    userid: item.userid,
                    isBurn: false,
                    icon: 'star',
                    verb: 'posted on',
                    platform: item.platform,
                    points: parseInt(process.env.REWARD_POINTS),
                    timestamp: item.data.timestamp,
                    message: process.env.REWARD_MESSAGE,
                    metadata: new Map<string, string>()
                }
                return pointEvent;
            }
        }
        return false;
    }
}