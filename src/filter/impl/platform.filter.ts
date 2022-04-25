import { ItemSet } from '../entities/item-set.model';
import { BaseFilter } from './base.filter';

export class PlatformFilter extends BaseFilter {
  readonly id = 'platform';

  async preprocess(itemSet: ItemSet) {
    if (!(itemSet.items.length > 0)) {
      return itemSet;
    }
    const item = itemSet.items[0];

    itemSet.platform = item.platform;
    return itemSet;
  }

  renderQueryBuilderFilter() {
    return {
      id: 'platform',
      label: 'Platform',
      type: 'integer',
      input: 'select',
      values: {
        1: 'Twitter',
        2: 'Instagram',
        3: 'Facebook',
      },
      operators: [
        'equal',
        'not_equal',
        'in',
        'not_in',
        'is_null',
        'is_not_null',
      ],
    };
  }
}
