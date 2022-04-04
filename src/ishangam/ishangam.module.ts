import { Module } from '@nestjs/common';
import { PointEventModule } from 'src/point-event/point-event.module';
import { IshangamService } from './ishangam.service';

@Module({
  imports: [PointEventModule],
  providers: [IshangamService],
  exports: [IshangamService],
})
export class IshangamModule {}
