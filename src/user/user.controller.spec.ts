import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { EmailTemplateModule } from 'src/email-template/email-template.module';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { QueueModule } from 'src/queue/queue.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
      imports: [CassandraModule, PointEventModule,PlatformConnectionModule,EmailTemplateModule,QueueModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
