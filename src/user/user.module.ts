import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SocialCredentialModule } from 'src/social-credential/social-credential.module';
import { ExtractorModule } from 'src/extractor/extractor.module';
import { UserRepository } from './user.repository';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [SocialCredentialModule, ExtractorModule, CassandraModule, PointEventModule,QueueModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
