import { Injectable } from '@nestjs/common';
import { emit } from 'process';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { RuleService } from 'src/rule/rule.service';
import { IExtractor } from 'src/interfaces/extractor.interface';
import { PlatformConnection } from 'src/platform-connection/entities/platform-connection.entity';
import { IPointRule } from 'src/interfaces/point-rule.interface';
import { stringify } from 'querystring';
import { PointEvent } from 'src/point-event/entities/point-event.entity';

import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
dotenv.config();

@Injectable()
export class DemoPostRule implements IPointRule {
  private hashkey = 'demopostrule';

  async process(
    eventName: any,
    item: any,
  ): Promise<false | CreatePointEventDto> {
    if (eventName.startsWith('user.published.post')) {
      if (
        item.message &&
        item.message
          .toLowerCase()
          .includes('#' + process.env.REWARD_HASHTAG.toLowerCase())
      ) {
        const hashString = item.platform + item.data.id + this.hashkey;

        let icon = 'note-sticky';
        if (item.imageDownloader) {
          icon = await item.imageDownloader();
        }
        const pointEvent: CreatePointEventDto = {
          hashString: hashString,
          userid: item.userid,
          isBurn: false,
          icon: icon,
          verb: 'posted on',
          platform: item.platform,
          points: parseInt(process.env.REWARD_POINTS),
          timestamp: item.data.timestamp,
          message: process.env.REWARD_MESSAGE,
          metadata: new Map<string, string>(),
        };
        return pointEvent;
      }
    }
    return false;
  }
}
