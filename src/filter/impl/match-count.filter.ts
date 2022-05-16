import { ItemSet } from '../entities/item-set.model';
import { BaseFilter } from './base.filter';

export class MatchCountFilter extends BaseFilter {
  readonly id = 'match_count';

  renderQueryBuilderFilter() {
    return {
      id: this.id,
      label: 'Match count',
      type: 'integer',
      validation: {
        min: 0,
      },
    };
  }

  async preprocess(itemSet: ItemSet) {
    itemSet.match_count = itemSet.items.length;
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
