import { Test, TestingModule } from '@nestjs/testing';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { ExtractorModule } from 'src/extractor/extractor.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { SocialCredentialModule } from 'src/social-credential/social-credential.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
      imports: [SocialCredentialModule, ExtractorModule, CassandraModule, PointEventModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
