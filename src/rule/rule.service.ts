import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IRuleTemplate } from 'src/interfaces/point-rule.interface';
import { PointEventService } from 'src/point-event/point-event.service';
import { PostedRuleTemplate } from './template/posted.rule-template';
import { SharedRuleTemplate } from './template/shared.rule-template';
import { RuleRepository } from './rule.repository';
import { ContentReachedNSharesRuleTemplate } from './template/content-reached-n-shares.rule-template';
import { Rule } from './entities/rule.model';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { ContentCreatedTemplate } from './template/content-created.rule-template';
import { FilterLayer } from './layer/filter.rule-layer';
import { PostedNTimesRuleTemplate } from './template/posted-n-times.rule-template';
import { UserHistoryLayer } from './layer/user-history.rule-layer';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { ModuleRef } from '@nestjs/core';
import { FilterService } from 'src/filter/filter.service';
import { ItemSet } from 'src/filter/entities/item-set.model';
import { CreateRuleDto } from './dto/create-rule.dto';

@Injectable()
export class RuleService {
  public readonly templates: { [key: string]: IRuleTemplate };

  constructor(
    private moduleRef: ModuleRef,
    private ruleRepository: RuleRepository,
    private postedRuleTemplate: PostedRuleTemplate,
    private postedNTimesRuleTemplate: PostedNTimesRuleTemplate,
    private sharedRuleTemplate: SharedRuleTemplate,
    private pointEventService: PointEventService,
    private contentReachedNSharesRuleTemplate: ContentReachedNSharesRuleTemplate,
    private contentCreatedTemplate: ContentCreatedTemplate,
    private filterService: FilterService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager,
  ) {
    this.templates = {
      posted: postedRuleTemplate,
      shared: sharedRuleTemplate,
      contentReachedNShares: contentReachedNSharesRuleTemplate,
      contentCreated: contentCreatedTemplate,
      postedNTimes: postedNTimesRuleTemplate,
    };
  }

  async getRule(id: string) {
    const rules = await this.getRules();
    for (const rule of rules) {
      if (rule.id.toString() === id) {
        return rule;
      }
    }
  }

  async createRule(createRuleDto: CreateRuleDto) {
    await this.ruleRepository.createRule(createRuleDto);
    await this.cacheManager.del('all-rules');
  }

  async updateRule(updateRuleDto: UpdateRuleDto) {
    await this.ruleRepository.updateRule(updateRuleDto);
    await this.cacheManager.del('all-rules');
  }

  async deleteRule(id: string) {
    await this.ruleRepository.deleteRule(id);
    await this.cacheManager.del('all-rules');
  }

  async getRules(): Promise<Rule[]> {
    const cacheKey = 'all-rules';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }
    const data = await this.ruleRepository.getAll();

    for (const rule of data) {
      rule.templateObj = this.templates[rule.template];
      rule.description = rule.templateObj.description;
      const layers = JSON.parse(rule.layersJson || '[]');
      rule.layers = [];
      for (const layer of layers) {
        // Deserialize from json saved in database
        if (layer.type === 'FilterLayer' || layer.type === 'UserHistoryLayer') {
          const options = layer.options;
          const filters = layer.options.filters;
          const filterInstances = [];
          for (const filter of filters) {
            // get filter based on the defined class name
            const filterInstance = this.filterService.getFilter(filter.id);
            filterInstances.push(filterInstance);
          }
          const rules = options.rules;

          let layerInstance;
          if (layer.type === 'FilterLayer') {
            layerInstance = new FilterLayer();
          } else if (layer.type === 'UserHistoryLayer') {
            layerInstance = await this.moduleRef.create(UserHistoryLayer);
          }

          layerInstance.addFilters(filterInstances);
          layerInstance.addActiveRules(rules);
          //layerInstance.setOptions(layer.options);
          rule.layers.push(layerInstance);
        }
      }
    }
    this.cacheManager.set(cacheKey, data, { ttl: 20 });

    return data;
  }

  async evaluate(rule: Rule, input: ItemSet): Promise<ItemSet> {
    let current = input;
    for (const layer of rule.layers) {
      const remainingItems = current.items.some((item) => item !== false);
      if (!remainingItems) {
        return current;
      }
      current = await layer.call(current);
    }
    return current;
  }

  async trigger(name: string, item) {
    const rules = await this.getRules();

    item.eventName = name;

    for (const rule of rules) {
      if (!rule.enabled) continue;
      let result;
      const template = this.templates[rule.template];
      if (!template) {
        console.error('Could not find template ' + rule.template);
        continue;
      }

      //const preprocessedItem = await template.preprocess(item);
      const itemSet = {
        items: [item],
        user: item.user,
        userid: item.userid,
      };
      const evaluated = await this.evaluate(rule, itemSet);

      const remainingItems = evaluated.items.some((item) => item !== false);

      if (remainingItems) {
        result = await template.reward(name, itemSet, rule);
      }

      /*
      try {
        const filters = template.options();
        // Check if rule is triggered
        const recurse = async (r) => {
          if (r.condition) {
            if (r.condition == 'AND') {
              return r.rules.every((innerRule) => recurse(innerRule));
            } else {
              return r.rules.some((innerRule) => recurse(innerRule));
            }
          }
          if (!Object.keys(filters).includes(r.id)) {
            return true;
          }
          return filters[r.id].filter(item);
        };
        result = await recurse(rules);
        if (result) {
          result = await template.reward(name, item, rule.options);
        }
      } catch (err) {
        console.log('Error processing template ' + rule.template + ': ' + err);
      }*/

      if (result) {
        if (!result.metadata) {
          result.metadata = {};
        }
        result.metadata.template = rule.template;
        result.metadata.item = JSON.stringify(item);

        /* TODO: implement onPointEvent trigger from points awarded

        let onPointEvent;
        for (const _rule of rules) {
          const template = this.templates[_rule.template];
            try {
              result = await template.onPointEvent(result, rule.options, item);
            } catch (err) {
              console.log('Error processing template ' + rule.template + ': ' + err);
            }
          }   
        }*/

        await this.pointEventService.create(result);
      }
    }
  }
}
