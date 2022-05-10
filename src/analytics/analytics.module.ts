import { Module } from '@nestjs/common';
import { EmailTemplateModule } from 'src/email-template/email-template.module';
import { PlatformConnectionModule } from 'src/platform-connection/platform-connection.module';
import { PointEventModule } from 'src/point-event/point-event.module';
import { UnsubscribeModule } from 'src/unsubscribe/unsubscribe.module';
import { UserModule } from 'src/user/user.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [UserModule, UnsubscribeModule,PointEventModule,PlatformConnectionModule,EmailTemplateModule],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
