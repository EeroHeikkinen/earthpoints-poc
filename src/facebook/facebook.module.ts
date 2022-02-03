import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';

@Module({
  imports: [HttpModule],
  providers: [FacebookService],
  exports: [FacebookService],
})
export class FacebookModule {}
