import { Module } from '@nestjs/common';
import { SocialCredentialService } from './social-credential.service';
import { SocialCredentialController } from './social-credential.controller';
import { SocialCredentialRepository } from './social-credential.repository';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { SocialCredential } from './entities/social-credential.entity';

@Module({
  imports: [CassandraModule],
  controllers: [SocialCredentialController],
  providers: [SocialCredentialService, SocialCredentialRepository],
  exports: [SocialCredentialService]
})
export class SocialCredentialModule {}
