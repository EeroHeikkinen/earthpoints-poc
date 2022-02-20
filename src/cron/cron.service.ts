import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { getMaxListeners } from 'process';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { UserService } from 'src/user/user.service';
 
@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);
    constructor(
      private userService: UserService,
      private platformConnectionService: PlatformConnectionService
      ){}

    @Cron('* * * * *')
    async handleCron() {
      const currentCallDate = new Date();
      this.logger.debug('Called');
      const timezone = '';

      //Sync all users
      const users = await (await this.userService.findAll()).toArray();
      for (const user of users) {
        await this.userService.syncPoints(user.userid);
        console.log("synced for " + user.userid.toString());

        await this.userService.triggerScheduledEmails(user.userid, currentCallDate)
      }
    }

}
