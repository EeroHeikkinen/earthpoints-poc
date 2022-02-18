import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';
 
@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);
    constructor(
      private userService: UserService
      ){}

    @Cron('* * * * * *')
    async handleCron() {
      this.logger.debug('Called');

      const users = await (await this.userService.findAll()).toArray();
      for (const user of users) {
        console.log(user.userid);
      }

      //Sync all users

      //Send emails to users
    }

}
