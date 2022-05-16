import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { ContentCreatedTemplate } from './content-created.rule-template';
import { FilterLayer } from '../layer/filter.rule-layer';
import { UserHistoryLayer } from '../layer/user-history.rule-layer';
import { IRuleLayer } from 'src/interfaces/rule-layer.interface';
import { ModuleRef } from '@nestjs/core';
import { ContentTypeFilter } from 'src/filter/impl/content-type.filter';
import { MatchCountFilter } from 'src/filter/impl/match-count.filter';
import { ItemSet } from 'src/filter/entities/item-set.model';
import { StreakCountFilter } from 'src/filter/impl/streak-count.filter';
dotenv.config();

@Injectable()
export class PostedNTimesRuleTemplate extends ContentCreatedTemplate {
  protected hashkey = 'postedntimesruletemplate';
  public description =
    'This template triggers when a user posts more than a specified number of times.';
  public title = 'User posted N times';

  constructor(private moduleRef: ModuleRef) {
    super();
  }

  async initLayers(): Promise<IRuleLayer[]> {
    let layers = await super.initLayers();

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

    layers = layers.concat([
      (await this.moduleRef.create(UserHistoryLayer))
        .addFilters((layers[0] as FilterLayer).filters)
        .addActiveRules([
          {
            id: 'content_type',
            field: 'content_type',
            type: 'integer',
            input: 'select',
            operator: 'equal',
            readonly: true,
            value: ContentTypeFilter.options.Post,
          },
        ]),
      new FilterLayer({
        filters: [new MatchCountFilter(), new StreakCountFilter()],
      }),
    ]);

    return layers;
  }

  async reward(
    eventName: string,
    itemSet: ItemSet,
    rule: any,
  ): Promise<false | CreatePointEventDto> {
    const hashString = rule.id + itemSet.userid;

    const icon = 'note-sticky';
    const firstItem = itemSet.items[0];
    const pointEvent: CreatePointEventDto = {
      hashString: hashString,
      userid: itemSet.userid,
      isBurn: false,
      icon: icon,
      verb: 'posted on',
      platform: firstItem.platform,
      points: parseInt(rule.options.points),
      timestamp: firstItem.data.timestamp,
      message: rule.options.message,
    };
    return pointEvent;
  }
}
