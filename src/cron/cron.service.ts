import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { getMaxListeners } from 'process';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { QueueService } from 'src/queue/queue.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    private userService: UserService,
    private platformConnectionService: PlatformConnectionService,
    private queueService: QueueService,
  ) {}

  @Cron(process.env.CRON || '*/30 * * * *') // Every 30 minutes
  async handleCron() {
    // Take a snapshot of time which will be the same for all items in this batch
    // to make sure we don't process any actions twice for a certain same time period in case of delays
    const initialTimestamp = new Date();
    //Sync all users
    const users = await (await this.userService.findAll()).toArray();
    for (const user of users) {
      this.queueService.addUserIdToQueue(user.userid, initialTimestamp);
    }
  }
}
