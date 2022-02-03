import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { FacebookModule } from 'src/facebook/facebook.module';
import { AchievementController } from './achievement.controller';
import { AchievementRepository } from './achievement.repository';
import { AchievementService } from './achievement.service';

@Module({
  imports: [CassandraModule, FacebookModule],
  controllers: [AchievementController],
  providers: [
    AchievementService,
    AchievementRepository
  ],
  exports: [AchievementService]
})
export class AchievementModule {}
