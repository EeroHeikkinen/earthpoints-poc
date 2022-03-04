import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { EmailTemplateModule } from 'src/email-template/email-template.module';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { UserModule } from './user.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [    PlatformConnectionModule,
        CassandraModule,
        PointEventModule,
        EmailTemplateModule],
      imports: [CassandraModule, PointEventModule,UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
