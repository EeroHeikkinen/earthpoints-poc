import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { RedisClient } from 'redis';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { session as passportSession, initialize as passportInitialize } from 'passport';
import { RedisModule } from './redis/redis.module';

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
    CanvasModule,
    RedisModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(@Inject('AUTH:REDIS') private readonly redisClient: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({ client: this.redisClient, logErrors: true }),
          saveUninitialized: false,
          secret: process.env.SESSION_STORE_REDIS_SECRET || 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passportInitialize(),
        passportSession(),
      )
      .forRoutes('*');
  }  
}
