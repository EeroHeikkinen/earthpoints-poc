import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { DemoSaveSoilRule } from './impl/demo-save-soil.rule';
import { RuleRepository } from './rule.repository';
import { RuleService } from './rule.service';

@Module({
  imports: [CassandraModule, PointEventModule],
  providers: [RuleRepository, RuleService, DemoSaveSoilRule],
  exports: [RuleService]
})
export class RuleModule {}
