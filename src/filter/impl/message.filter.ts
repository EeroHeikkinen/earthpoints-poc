import { ItemSet } from '../entities/item-set.model';
import { BaseFilter } from './base.filter';

export class MessageFilter extends BaseFilter {
  readonly id = 'message';

  renderQueryBuilderFilter() {
    return {
      id: 'message',
      label: 'Message',
      type: 'string',
    };
  }

  async preprocess(itemSet: ItemSet) {
    if (!(itemSet.items.length > 0)) {
      return itemSet;
    }
    const item = itemSet.items[0];

    itemSet.message = item.data.message;

    return itemSet;
  }
}
