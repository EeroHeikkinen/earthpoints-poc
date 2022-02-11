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

@Injectable()
export class DemoSaveSoilRule implements IPointRule {
    private hashkey = 'demorule';

    async process(eventName: any, item:any): Promise<false | PointEvent> {
        if(eventName.startsWith('user.published.post')) {
            if(item.message && item.message.includes("#luontokuva")) {
                const hash = await bcrypt.hash(item.platform + item.data.id + this.hashkey, 10);
                console.log("hash for " +item.platform + item.data.id + this.hashkey +" = "  + hash)
                const pointEvent:PointEvent = {
                    'hash': hash,
                    userid: item.userid,
                    isBurn: false,
                    points: 3,
                    timestamp: new Date(),
                    message: "You posted about luontokuva! Nice going!",
                    icon: 'facebook.png',
                    metadata: new Map<string, string>()
                }
                return pointEvent;
            }
        }
        return false;
    }
}