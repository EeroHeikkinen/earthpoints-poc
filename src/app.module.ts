import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { AppService } from './app.service';
import { FacebookApiModule } from './facebook-api/facebook-api.module';
import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';
import { TemplateModule } from './template/template.module';
import { PlatformConnectionModule } from './platform-connection/platform-connection.module';
import { PointEventModule } from './point-event/point-event.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { InstagramApiModule } from './instagram-api/instagram-api.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailTemplateModule } from './email-template/email-template.module';

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
    PlatformConnectionModule,
    PointEventModule,
    InstagramApiModule,
    ScheduleModule.forRoot(),
    CronModule,
    EmailTemplateModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
