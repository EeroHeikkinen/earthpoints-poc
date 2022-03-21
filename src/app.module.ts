import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailTemplateModule } from './email-template/email-template.module';
import { CanvasModule } from './canvas/canvas.module';
import { ExternalJwtMiddleware } from './auth/external-jwt.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
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
    QueueModule,
    ScheduleModule.forRoot(),
    CronModule,
    EmailTemplateModule,
    CanvasModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExternalJwtMiddleware).forRoutes('*');
  }
}
