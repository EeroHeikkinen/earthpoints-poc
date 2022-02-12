import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookService } from 'src/facebook/facebook.service';
import { RuleService } from 'src/rule/rule.service';
import { IPlatformAdapter } from 'src/interfaces/platform-adapter.interface';
import { SocialCredential } from 'src/social-credential/entities/social-credential.entity';
import { IPointRule } from 'src/interfaces/point-rule.interface';
import { stringify } from 'querystring';
import { PointEvent } from 'src/point-event/entities/point-event.entity';
var crypto = require('crypto');

import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class DemoShareRule implements IPointRule {
    private hashkey = 'demosharerule';

    async process(eventName: any, item:any): Promise<false | PointEvent> {
        if(eventName.startsWith('user.published.share')) {
            if(item.message && item.message.toLowerCase().includes("#" + process.env.REWARD_HASHTAG.toLowerCase())) {
                var hashString = item.platform + item.data.id + this.hashkey;
                const hash = crypto.createHash('sha256').update(hashString).digest('base64');

                console.log("hash for " + item.platform + item.data.id + this.hashkey + " = "  + hash)
                const pointEvent:PointEvent = {
                    'hash': hash,
                    userid: item.userid,
                    isBurn: false,
                    icon: 'star',
                    verb: 'shared',
                    platform: item.platform,
                    points: parseInt(process.env.SHARE_POINTS),
                    timestamp: item.data.timestamp,
                    message: process.env.SHARE_MESSAGE,
                    metadata: new Map<string, string>()
                }
                return pointEvent;
            }
        }
        return false;
    }
}