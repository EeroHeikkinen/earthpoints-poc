import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CronService } from './cron.service';

@Module({
  imports: [UserService],
  providers: [CronService]
})
export class CronModule {}
