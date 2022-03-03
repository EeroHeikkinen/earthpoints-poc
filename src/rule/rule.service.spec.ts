import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { DemoPostRule } from './impl/demo-post-rule';
import { DemoShareRule } from './impl/demo-share-rule';
import { RuleRepository } from './rule.repository';
import { RuleService } from './rule.service';

describe('RuleService', () => {
  let service: RuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleRepository, RuleService, DemoShareRule, DemoPostRule],
      imports: [CassandraModule, PointEventModule],
    }).compile();

    service = module.get<RuleService>(RuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
