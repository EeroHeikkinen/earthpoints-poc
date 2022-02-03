import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { AchievementModule } from './achievement/achievement.module';
import { CassandraModule } from './cassandra/cassandra.module';
import { AppService } from './app.service';
import { FacebookModule } from './facebook/facebook.module';

@Module({
  imports: [
    AuthModule,
    CassandraModule,
    AchievementModule,
    FacebookModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
