import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { RuleRepository } from './rule.repository';
import { RuleService } from './rule.service';

@Module({
  imports: [CassandraModule],
  providers: [RuleRepository, RuleService],
  exports: [RuleService]
})
export class RuleModule {}
