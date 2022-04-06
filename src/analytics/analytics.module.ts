import { Module } from '@nestjs/common';
import { PointEventModule } from 'src/point-event/point-event.module';
import { UnsubscribeModule } from 'src/unsubscribe/unsubscribe.module';
import { UserModule } from 'src/user/user.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [UserModule, UnsubscribeModule,PointEventModule],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
