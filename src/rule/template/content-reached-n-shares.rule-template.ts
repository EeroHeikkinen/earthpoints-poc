import { Injectable } from '@nestjs/common';
import { IRuleTemplate } from 'src/interfaces/point-rule.interface';

import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { ContentCreatedTemplate } from './content-created.rule-template';
import { BaseFilter } from 'src/filter/impl/base.filter';
dotenv.config();

@Injectable()
export class ContentReachedNSharesRuleTemplate extends ContentCreatedTemplate {
  protected hashkey = 'content-reached-n-shares';
  public readonly description = 'Content has reached N shares';
  public readonly title = 'Content reached N shares';

  public options() {
    return {
      ...super.options(),
      shares: new BaseFilter({
        queryBuilderFilter: {
          id: 'shares',
          label: 'Share count',
          type: 'integer',
        },
      }),
    };
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
          };
          return pointEvent;
        }
      }
    }
    return false;
  }
}
