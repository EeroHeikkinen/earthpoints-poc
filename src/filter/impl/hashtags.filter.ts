import { ItemSet } from '../entities/item-set.model';
import { BaseFilter } from './base.filter';

export class HashtagsFilter extends BaseFilter {
  readonly id = 'hashtags';

  extractHashtags(searchText) {
    if (!searchText) return [];
    const regexp = /\B\#\w\w+\b/g;
    const result = searchText.match(regexp);
    if (result) {
      return result;
    } else {
      return [];
    }
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async preprocess(itemSet: ItemSet) {
    for (const item of itemSet.items) {
      item.hashtags = (item.hashtags || [])
        .concat(this.extractHashtags(item.message))
        .filter(this.onlyUnique);
    }
    return itemSet;
  }

  renderQueryBuilderFilter() {
    return {
      id: 'hashtags',
      label: 'Hashtags',
      type: 'string',
    };
  }
}
