import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { BaseRuleTemplate } from './base.rule-template';
import { IRuleLayer } from 'src/interfaces/rule-layer.interface';
import { FilterLayer } from '../layer/filter.rule-layer';
import { ContentTypeFilter } from 'src/filter/impl/content-type.filter';
import { HashtagsFilter } from 'src/filter/impl/hashtags.filter';
import { MessageFilter } from 'src/filter/impl/message.filter';
import { PlatformFilter } from 'src/filter/impl/platform.filter';

dotenv.config();

@Injectable()
export class ContentCreatedTemplate extends BaseRuleTemplate {
  protected hashkey = 'contentcreatedtemplate';
  public description =
    'This is a general class for all user created content, including both posts and shares.';
  public title = 'User posted or shared';

  async initLayers(): Promise<IRuleLayer[]> {
    const layers = [
      new FilterLayer({
        filters: [
          new PlatformFilter(),
          new HashtagsFilter(),
          new MessageFilter(),
          new ContentTypeFilter(),
        ],
      }),
    ];

    return layers;
  }

  async reward(
    eventName: string,
    itemSet: any,
    options: any,
  ): Promise<false | CreatePointEventDto> {
    const item = itemSet.items[0];
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
      verb: options.action,
      platform: item.platform,
      points: parseInt(options.points),
      timestamp: item.data.timestamp,
      message: options.message,
    };
    return pointEvent;
  }
}
