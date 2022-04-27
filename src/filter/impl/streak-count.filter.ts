import { ItemSet } from '../entities/item-set.model';
import { BaseFilter } from './base.filter';

export class StreakCountFilter extends BaseFilter {
  readonly id = 'streak_count';

  renderQueryBuilderFilter() {
    return {
      id: this.id,
      label: 'Streak count (days)',
      type: 'integer',
      validation: {
        min: 0,
      },
    };
  }

  async preprocess(itemSet: ItemSet) {
    for (const item of itemSet.items) {
      // start from latest item
      // go back until the streak is no longer continous
      // check how long is the current streak from latest item
    }
    itemSet.streak_count = 3;
    return itemSet;
  }

  filter(rule: any, itemSet: ItemSet): ItemSet {
    const id = rule.id;
    const operator = this.operators[rule.operator];
    if (!operator) {
      console.error('Undefined operator ' + rule.operator);
      itemSet.items = itemSet.items.map(() => false);
      return itemSet;
    }
    let value = rule.value;
    if (rule.input === 'select') {
      for (const optionKey in (this.constructor as typeof BaseFilter).options) {
        const optionValue = (this.constructor as typeof BaseFilter).options[
          optionKey
        ];
        if (value == optionValue) {
          value = optionKey;
          break;
        }
      }
    }

    console.log('Evaluating rule: ' + id + ' ' + operator + ' ' + value);
    const operatorEvaluationResult = operator(itemSet[id], value);
    if (operatorEvaluationResult !== true) {
      itemSet.items = itemSet.items.map(() => false);
    }
    console.log('itemSet after evaluation: ' + JSON.stringify(itemSet));
    return itemSet;
  }
}
