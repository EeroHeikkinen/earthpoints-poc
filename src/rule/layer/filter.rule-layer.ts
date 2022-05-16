import * as dotenv from 'dotenv';
import { BaseRuleLayer } from './base.rule-layer';
import { v4 as uuidv4 } from 'uuid';
import { BaseFilter } from 'src/filter/impl/base.filter';
import { ItemSet } from 'src/filter/entities/item-set.model';

dotenv.config();

export class FilterLayer extends BaseRuleLayer {
  protected type = 'FilterLayer';
  public title = 'Apply filter';
  protected uuid = uuidv4();

  public filters: BaseFilter[];
  protected rules: any[];

  constructor(options?: { filters: any; activeRules?: any }) {
    super(options);
    if (options && options.filters) {
      this.addFilters(options.filters);
    }
    if (options && options.activeRules) {
      this.addActiveRules(options.activeRules);
    }
  }

  render() {
    const rules = this.rules || [{ empty: true }];
    return `<div data-qb-rules='${JSON.stringify(rules)}' data-type='${
      this.type
    }' data-qb-filters='${JSON.stringify(
      (this.filters || []).map((filter: any) =>
        filter.renderQueryBuilderFilter(),
      ),
    )}' class="filter-rule-builder query-builder"></div>`;
  }

  addFilters(filters: BaseFilter[]) {
    this.filters = (this.filters || []).concat(filters);
    return this;
  }

  addActiveRules(rules: any[]) {
    this.rules = (this.rules || []).concat(rules);
    return this;
  }

  getFilter(id) {
    for (const filter of this.filters) {
      if (filter.id == id) {
        return filter;
      }
    }
    return false;
  }

  async filterArrayByConfiguredRules(itemSet: ItemSet) {
    //const filteredItems = [];
    //outerloop: for (const item in itemSet) {
    //for (const rule of this.rules) {
    try {
      // Check if rule is triggered
      const recurse = async (r) => {
        if (r.condition) {
          // run each rule
          // then merge itemsets based on and condition
          const resultsets: ItemSet[] = [];
          for (const rule of r.rules) {
            resultsets.push(await recurse(rule));
          }

          const finalset = Object.assign({}, itemSet);

          if (r.condition == 'AND') {
            // extract those that matched all rules
            for (const [index] of itemSet.items.entries()) {
              for (const resultset of resultsets) {
                if (!resultset.items[index]) {
                  finalset.items[index] = false;
                }
              }
            }
          } else if (r.condition == 'OR') {
            // extract those that matched any of the rules
            finalset.items = finalset.items.map(() => false);
            for (const [index] of itemSet.items.entries()) {
              for (const resultset of resultsets) {
                if (resultset.items[index]) {
                  finalset.items[index] = resultset.items[index];
                }
              }
            }
          }

          return finalset;
        }
        // we reached the full depth, evaluate the actual rule
        const filter = this.getFilter(r.id);
        if (!filter) {
          console.error('Unknown filter ' + r.id);
          const failedset = Object.assign({}, itemSet);
          failedset.items = failedset.items.map(() => false);
          return failedset;
        }

        const itemSetCopy = Object.assign({}, itemSet);
        const preprocessed = await filter.preprocess(itemSetCopy);
        const filteredset = filter.filter(r, preprocessed);
        return filteredset;
      };
      const filterResult = await recurse(this.rules[0]);
      return filterResult;
    } catch (err) {
      console.log('Error processing rule: ' + err);
      throw err;
    }
  }

  async call(inputs: any) {
    return this.filterArrayByConfiguredRules(inputs);
  }
}
