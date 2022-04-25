import { IPropertyWidget } from 'src/interfaces/property-widget.interface';
import { ItemSet } from '../entities/item-set.model';

export class BaseFilter implements IPropertyWidget {
  readonly id;
  static readonly options: any;
  queryBuilderFilter: any;

  protected operators = {
    equal: (a, b) => a == b,
    greater_or_equal: (a, b) => a >= b,
    contains: (a, b) => {
      const items = b.split(',').map((item) => item.toLowerCase().trim());
      const match = a.some((item) => items.includes(item.toLowerCase().trim()));
      return match;
    },
  };

  renderQueryBuilderFilter() {
    return this.queryBuilderFilter;
  }

  constructor(options?: any) {
    if (options) {
      this.queryBuilderFilter = options.queryBuilderFilter;
    }
  }

  async preprocess(item: ItemSet) {
    return item;
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
    itemSet.items = itemSet.items.map((item) => {
      if (item === false) return false;
      const operatorEvaluationResult = operator(item[id], value);
      if (operatorEvaluationResult == true) return item;
      return false;
    });
    console.log('itemSet after evaluation: ' + JSON.stringify(itemSet));
    return itemSet;
  }
}
