import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { UserRepository } from './user.repository';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { EmailTemplateModule } from 'src/email-template/email-template.module';

@Module({
  imports: [PlatformConnectionModule, CassandraModule, PointEventModule, EmailTemplateModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
