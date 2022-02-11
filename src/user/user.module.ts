import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SocialCredentialModule } from 'src/social-credential/social-credential.module';
import { AdapterService } from 'src/adapter/adapter.service';
import { AdapterModule } from 'src/adapter/adapter.module';
import { UserRepository } from './user.repository';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventService } from 'src/point-event/point-event.service';
import { PointEventModule } from 'src/point-event/point-event.module';

@Module({
  imports: [SocialCredentialModule, AdapterModule, CassandraModule, PointEventModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
