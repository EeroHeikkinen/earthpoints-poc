import * as bcrypt from 'bcrypt';
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
dotenv.config();

@Injectable()
export class DemoSaveSoilRule implements IPointRule {
    private hashkey = 'demorule';

    async process(eventName: any, item:any): Promise<false | PointEvent> {
        if(eventName.startsWith('user.published.post')) {
            if(item.message && item.message.includes("#" + process.env.REWARD_HASHTAG)) {
                const hash = await bcrypt.hash(item.platform + item.data.id + this.hashkey, 10);
                console.log("hash for " + item.platform + item.data.id + this.hashkey + " = "  + hash)
                const pointEvent:PointEvent = {
                    'hash': hash,
                    userid: item.userid,
                    isBurn: false,
                    icon: 'star',
                    verb: 'posted',
                    platform: item.platform,
                    points: parseInt(process.env.REWARD_POINTS),
                    timestamp: new Date(),
                    message: process.env.REWARD_MESSAGE,
                    metadata: new Map<string, string>()
                }
                return pointEvent;
            }
        }
        return false;
    }
}