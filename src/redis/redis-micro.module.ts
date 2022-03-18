import { Module } from '@nestjs/common';
import { PointEventModule } from 'src/point-event/point-event.module';
import { RedisMicroController } from './redis-micro.controller';

@Module({
  imports:  [PointEventModule],
  providers: [],
  exports: [],
  controllers: [RedisMicroController],
})
export class RedisMicroModule {}
