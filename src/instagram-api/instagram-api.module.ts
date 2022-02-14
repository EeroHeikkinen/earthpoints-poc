import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InstagramApiService } from './instagram-api.service';

@Module({
  imports: [HttpModule],
  providers: [InstagramApiService],
  exports: [InstagramApiService]
})
export class InstagramApiModule {}
