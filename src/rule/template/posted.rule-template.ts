import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { ContentCreatedTemplate } from './content-created.rule-template';
import { IRuleLayer } from 'src/interfaces/rule-layer.interface';
import { ContentTypeFilter } from 'src/filter/impl/content-type.filter';
import { FilterLayer } from '../layer/filter.rule-layer';

dotenv.config();

@Injectable()
export class PostedRuleTemplate extends ContentCreatedTemplate {
  protected hashkey = 'demopostrule';
  public description =
    'This template triggers when a user posts any kind of new content.';
  public title = 'User posted';

  async initLayers(): Promise<IRuleLayer[]> {
    const layers = await super.initLayers();
    (layers[0] as FilterLayer).addActiveRules([
      {
        id: 'content_type',
        field: 'content_type',
        type: 'integer',
        input: 'select',
        operator: 'equal',
        readonly: true,
        value: ContentTypeFilter.options.Post,
      },
    ]);

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
      verb: 'posted on',
      platform: item.platform,
      points: parseInt(options.options.points),
      timestamp: item.data.timestamp,
      message: options.message,
    };
    return pointEvent;
  }
}
