import { Module } from '@nestjs/common';
import { IshangamService } from './ishangam.service';

@Module({
  imports: [],
  providers: [IshangamService],
  exports: [IshangamService],
})
export class IshangamModule {}
