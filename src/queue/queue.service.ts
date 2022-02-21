import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
@Injectable()
export class QueueService {

    constructor(@InjectQueue('sync') private syncQueue: Queue) {}

    async addUserIdToQueue(userid) {
        this.syncQueue.add({userid: userid});
    }
}
