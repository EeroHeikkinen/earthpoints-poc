import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { AchievementModule } from './achievement/achievement.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { AppService } from './app.service';
import { FacebookModule } from './facebook/facebook.module';
import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';
import { TemplateModule } from './template/template.module';
import { AdapterModule } from './adapter/adapter.module';
import { SocialCredentialModule } from './social-credential/social-credential.module';

@Module({
  imports: [
    AuthModule,
    CassandraModule,
    AchievementModule,
    FacebookModule,
    UserModule,
    RuleModule,
    TemplateModule,
    AdapterModule,
    SocialCredentialModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
