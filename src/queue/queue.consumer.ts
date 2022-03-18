import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailTemplateService } from 'src/email-template/email-template.service';
import { UserService } from 'src/user/user.service';

@Processor('sync')
export class QueueConsumer {
  constructor(
    private userService: UserService,
    private emailTemplateService: EmailTemplateService,
  ) {}

  @Process('syncUser')
  async syncUser(job: Job<unknown>) {
    if(process.env.POD_NAME != 'earthpoints-que-0')
    {
      console.log('syncUser is not allowed in this pod');
      return;
    }
    //TODO: Consumer to implement
    const { userid, timestamp } = job.data as {
      userid: string;
      timestamp: Date;
    };

    await this.userService.syncPoints(userid);
    const user = await this.userService.findByUserId(userid);

    this.emailTemplateService.processScheduled(user, new Date(timestamp));

    console.log(
      `!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!User is synced with number of points: ${user.points}`,
    );
  }

  @Process('sendDailyEmail')
  async sendDailyEmail(job: Job<unknown>) {
    await new Promise((r) => setTimeout(r, 30000));
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!User is synced %s', job.data);
  }
}
