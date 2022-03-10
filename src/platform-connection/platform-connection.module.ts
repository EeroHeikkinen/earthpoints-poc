import { forwardRef, Module } from '@nestjs/common';
import { PlatformConnectionService } from './platform-connection.service';
import { PlatformConnectionController } from './platform-connection.controller';
import { PlatformConnectionRepository } from './platform-connection.repository';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { FacebookExtractor } from './extractors/facebook.extractor';
import { InstagramExtractor } from './extractors/instagram.extractor';
import { TwitterExtractor } from './extractors/twitter.extractor';
import { FacebookApiService } from 'src/facebook-api/facebook-api.service';
import { InstagramApiModule } from 'src/instagram-api/instagram-api.module';
import { FacebookApiModule } from 'src/facebook-api/facebook-api.module';
import { RuleModule } from 'src/rule/rule.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [CassandraModule, FacebookApiModule, InstagramApiModule, RuleModule, forwardRef(() => AuthModule)],
  controllers: [PlatformConnectionController],
  providers: [PlatformConnectionService, PlatformConnectionRepository, FacebookExtractor, InstagramExtractor, TwitterExtractor],
  exports: [PlatformConnectionService]
})
export class PlatformConnectionModule {}
