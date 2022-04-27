import { Injectable } from '@nestjs/common';
import { IRuleTemplate } from 'src/interfaces/point-rule.interface';

import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { User } from 'src/user/entities/user.entity';
import { BaseRuleTemplate } from './base.rule-template';
dotenv.config();

@Injectable()
export class UserReachedFirstRuleTemplate extends BaseRuleTemplate {
  private hashkey = 'content-reached-n-shares';

  /*
  options() {
    return {
      shares: 'int',
      points: 'int',
      message: 'string',
      priority: 'int',
      hashtags: String,
    };
  }*/

  async onPointEvent(
    event,
    user: User,
    options,
  ): Promise<CreatePointEventDto | false> {
    const { template } = options;
    const firstTimeTemplateActivated = user.events.some((event) =>
      event.metadata.get('event'),
    );
    return false;
    //user.events;
  }

  async reward(
    eventName: string,
    item: any,
    options: any,
  ): Promise<false | CreatePointEventDto> {
    if (eventName.startsWith('user.published.post')) {
      const hashTags = options.hashtags
        .split(',')
        .map((v) => '#' + v.trim().toLowerCase());
      if (item.message) {
        const hashTagsInMessage = hashTags.some((tag) =>
          item.message.toLowerCase().includes(tag),
        );
        if (hashTagsInMessage) {
          const targetShares = parseInt(options.shares);

          // This is what we are here for: let's verify the number of shares!
          if (!(item.data.shares && item.data.shares.count >= targetShares)) {
            // Not enough for award, sorry!
            return false;
          }
          // Hurray, we have a post with more shares than the limit

          const hashString =
            item.platform + item.data.id + this.hashkey + options.shares;

          let icon = 'note-sticky';
          if (item.imageDownloader) {
            icon = await item.imageDownloader();
          }

          const pointEvent: CreatePointEventDto = {
            hashString: hashString,
            userid: item.userid,
            isBurn: false,
            icon: icon,
            verb:
              options.shares > 1 ? 'received shares on' : 'received a share on',
            platform: item.platform,
            points: parseInt(options.points),
            timestamp: item.data.timestamp,
            message: options.message,
            priority: options.priority,
            metadata: new Map<string, string>([
              ['template', this.hashkey]
              ['data', JSON.stringify(item.data)],
            ]),
          };
          return pointEvent;
        }
      }
    }
    return false;
  }
}
