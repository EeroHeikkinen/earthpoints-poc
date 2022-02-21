import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('sync')
export class QueueConsumer {

    @Process()
    async syncUser(job: Job<unknown>) {
        //TODO: Consumer to implement
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!User is synced %s",job.data);
    }    
}