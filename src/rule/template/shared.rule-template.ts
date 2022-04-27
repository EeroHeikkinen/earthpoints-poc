import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { ContentCreatedTemplate } from './content-created.rule-template';
dotenv.config();

@Injectable()
export class SharedRuleTemplate extends ContentCreatedTemplate {
  protected hashkey = 'demosharerule';
  public readonly description =
    'This template triggers when a user shares any content.';
  public readonly title = 'User shared';

  async reward(
    eventName: string,
    itemSet: any,
    options: any,
  ): Promise<false | CreatePointEventDto> {
    const item = itemSet.items[0];
    const hashString = item.platform + item.data.id + this.hashkey;

    const pointEvent: CreatePointEventDto = {
      hashString: hashString,
      userid: item.userid,
      isBurn: false,
      icon: 'share',
      verb: 'shared on',
      priority: options.priority || 0,
      platform: item.platform,
      points: parseInt(options.options.points),
      timestamp: item.data.timestamp,
      message: options.message,
    };
    return pointEvent;
  }
}
