import { CacheModule, Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { TemplateModule } from 'src/template/template.module';
import { PostedRuleTemplate } from './template/posted.rule-template';
import { SharedRuleTemplate } from './template/shared.rule-template';
import { RuleRepository } from './rule.repository';
import { RuleService } from './rule.service';
import { ContentReachedNSharesRuleTemplate } from './template/content-reached-n-shares.rule-template';
import { RuleController } from './rule.controller';
import { ContentCreatedTemplate } from './template/content-created.rule-template';
import { PostedNTimesRuleTemplate } from './template/posted-n-times.rule-template';
import { FilterModule } from 'src/filter/filter.module';

@Module({
  imports: [
    CassandraModule,
    PointEventModule,
    TemplateModule,
    CacheModule.register(),
    FilterModule,
  ],
  providers: [
    RuleRepository,
    RuleService,
    PostedRuleTemplate,
    SharedRuleTemplate,
    ContentReachedNSharesRuleTemplate,
    ContentCreatedTemplate,
    PostedNTimesRuleTemplate,
  ],
  exports: [RuleService],
  controllers: [RuleController],
})
export class RuleModule {}
