import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
@Injectable()
export class QueueService {

    constructor(@InjectQueue('sync') private syncQueue: Queue) {}

    async addUserIdToQueue(userid, timestamp) {
        this.syncQueue.add('syncUser', { userid, timestamp },{jobId: userid, removeOnComplete: true});
    }
}
