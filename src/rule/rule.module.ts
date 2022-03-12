import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { DemoPostRule } from './impl/demo-post-rule';
import { DemoShareRule } from './impl/demo-share-rule';
import { RuleRepository } from './rule.repository';
import { RuleService } from './rule.service';

@Module({
  imports: [CassandraModule, PointEventModule],
  providers: [RuleRepository, RuleService, DemoShareRule, DemoPostRule],
  exports: [RuleService],
})
export class RuleModule {}
