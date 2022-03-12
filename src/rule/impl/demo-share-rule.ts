import { Injectable } from '@nestjs/common';
import { IPointRule } from 'src/interfaces/point-rule.interface';

import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
dotenv.config();

@Injectable()
export class DemoShareRule implements IPointRule {
  private hashkey = 'demosharerule';

  async process(
    eventName: any,
    item: any,
  ): Promise<false | CreatePointEventDto> {
    if (eventName.startsWith('user.published.share')) {
      if (
        item.message &&
        item.message
          .toLowerCase()
          .includes('#' + process.env.REWARD_HASHTAG.toLowerCase())
      ) {
        const hashString = item.platform + item.data.id + this.hashkey;

        const pointEvent: CreatePointEventDto = {
          hashString: hashString,
          userid: item.userid,
          isBurn: false,
          icon: 'share',
          verb: 'shared on',
          platform: item.platform,
          points: parseInt(process.env.SHARE_POINTS),
          timestamp: item.data.timestamp,
          message: process.env.SHARE_MESSAGE,
          metadata: new Map<string, string>(),
        };
        return pointEvent;
      }
    }
    return false;
  }
}
