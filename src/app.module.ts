import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { AppService } from './app.service';
import { FacebookModule } from './facebook/facebook.module';
import { UserModule } from './user/user.module';
import { RuleModule } from './rule/rule.module';
import { TemplateModule } from './template/template.module';
import { AdapterModule } from './adapter/adapter.module';
import { SocialCredentialModule } from './social-credential/social-credential.module';
import { PointEventModule } from './point-event/point-event.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    AuthModule,
    CassandraModule,
    FacebookModule,
    UserModule,
    RuleModule,
    TemplateModule,
    AdapterModule,
    SocialCredentialModule,
    PointEventModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
