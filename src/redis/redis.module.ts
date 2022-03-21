import { Module } from '@nestjs/common';
import * as Redis from 'redis';

@Module({
  providers: [
    {
      provide: 'AUTH:REDIS',
      useValue: Redis.createClient({
        //url: process.env.SESSION_STORE_REDIS_URL || 'redis://0.0.0.0:6379'
      }),
    },
  ],
  exports: ['AUTH:REDIS'],
})
export class RedisModule {}