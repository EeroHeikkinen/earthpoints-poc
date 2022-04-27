import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Rule } from './entities/rule.model';
import { CassandraService } from 'src/cassandra/cassandra.service';

@Injectable()
export class RuleRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  ruleMapper: mapping.ModelMapper<Rule>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        RuleInstance: {
          tables: ['rule_instance'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.ruleMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('RuleInstance');
  }

  async updateRule(updateRuleDto) {
    await this.ruleMapper.update(updateRuleDto);
  }

  async getAll() {
    return (await this.ruleMapper.findAll()).toArray();
  }

  async getByTrigger(trigger: string) {
    return (await this.ruleMapper.find({ trigger: trigger })).toArray();
  }
}
