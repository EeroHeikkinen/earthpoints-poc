import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
  imports:  [
    ClientsModule.register([
      {
        name: 'DIST_EVENTS',
        transport: Transport.REDIS,
        options: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`,
        }
      },
    ]),
  ],
  providers: [RedisService],
  exports: [RedisService],
  controllers: [],
})
export class RedisModule {}
