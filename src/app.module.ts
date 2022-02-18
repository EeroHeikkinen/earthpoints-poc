import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { AppService } from './app.service';
import { FacebookApiModule } from './facebook-api/facebook-api.module';
import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';
import { TemplateModule } from './template/template.module';
import { ExtractorModule } from './extractor/extractor.module';
import { SocialCredentialModule } from './social-credential/social-credential.module';
import { PointEventModule } from './point-event/point-event.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { InstagramApiModule } from './instagram-api/instagram-api.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    AuthModule,
    CassandraModule,
    FacebookApiModule,
    UserModule,
    RuleModule,
    TemplateModule,
    ExtractorModule,
    SocialCredentialModule,
    PointEventModule,
    InstagramApiModule,
    CronModule,
    ScheduleModule.forRoot()
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
