import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import { IPointRule } from 'src/interfaces/point-rule.interface';
import { stringify } from 'querystring';
import { PointEvent } from 'src/point-event/entities/point-event.entity';
var crypto = require('crypto');

import * as dotenv from "dotenv";
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
dotenv.config();

@Injectable()
export class DemoShareRule implements IPointRule {
    private hashkey = 'demosharerule';

    async process(eventName: any, item:any): Promise<false | CreatePointEventDto> {
        if(eventName.startsWith('user.published.share')) {
            if(item.message && item.message.toLowerCase().includes("#" + process.env.REWARD_HASHTAG.toLowerCase())) {
                var hashString = item.platform + item.data.id + this.hashkey;

                const pointEvent:CreatePointEventDto = {
                    hashString: hashString,
                    userid: item.userid,
                    isBurn: false,
                    icon: 'share',
                    verb: 'shared on',
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