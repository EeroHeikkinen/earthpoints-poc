import { ItemSet } from '../entities/item-set.model';
import { BaseFilter } from './base.filter';

export class ContentTypeFilter extends BaseFilter {
  readonly id = 'content_type';

  static readonly options = {
    Post: 1,
    Share: 2,
  };

  renderQueryBuilderFilter() {
    return {
      id: 'content_type',
      label: 'Content type',
      type: 'integer',
      input: 'select',
      values: {
        [ContentTypeFilter.options.Post]: 'Post',
        [ContentTypeFilter.options.Share]: 'Share',
      },
      operators: ['equal'],
    };
  }

  async preprocess(itemSet: ItemSet) {
    itemSet.items = itemSet.items.map((item) => {
      if (!item.eventName) {
        if (item.metadata && item.metadata.item) {
          const itemData = JSON.parse(item.metadata.item);
          item.eventName = itemData.eventName;
        }
      }
      if (!item.eventName) return item;

      if (item.eventName.startsWith('user.published.post')) {
        item.content_type = 'Post';
      }
      if (item.eventName.startsWith('user.published.share')) {
        item.content_type = 'Share';
      }
      return item;
    });

    return itemSet;
  }
}
