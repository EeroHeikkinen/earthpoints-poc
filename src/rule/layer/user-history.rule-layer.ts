import { Injectable, Scope } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { PointEventService } from 'src/point-event/point-event.service';
import { FilterLayer } from './filter.rule-layer';
dotenv.config();

@Injectable({ scope: Scope.TRANSIENT })
export class UserHistoryLayer extends FilterLayer {
  protected type = 'UserHistoryLayer';
  public title = 'Search user history';

  // I want to render the chosen options, which are coming from database as json
  constructor(private pointEventService?: PointEventService) {
    super();
  }

  async call(inputs: any) {
    if (inputs.length) {
      inputs = inputs[0];
    }
    const userid = inputs.userid;
    const events = await this.pointEventService.findAllForUser(userid);

    const itemSet = {
      items: events,
      userid: userid,
    };

    const filtered = await this.filterArrayByConfiguredRules(itemSet);
    filtered.items = filtered.items.filter((value) => value !== false);
    return filtered;
  }
}
