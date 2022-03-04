import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { UserService } from 'src/user/user.service';

@Processor('sync')
export class QueueConsumer {
  constructor(private userService: UserService) {}

  @Process('syncUser')
  async syncUser(job: Job<unknown>) {
    //TODO: Consumer to implement
    const { userid } = job.data as { userid: string };

    await new Promise((r) => setTimeout(r, 30000));

    await this.userService.syncPoints(userid);
    const user = await this.userService.findByUserId(userid);

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
