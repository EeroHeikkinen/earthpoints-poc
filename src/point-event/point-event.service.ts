import { InjectQueue, OnGlobalQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Subject } from 'rxjs';
import { CreatePointEventDto } from './dto/create-point-event.dto';
import { UpdatePointEventDto } from './dto/update-point-event.dto';
import { PointEventRepository } from './point-event.repository';
var crypto = require('crypto');

@Injectable()
@Processor('sse')
export class PointEventService {

  public subject = new Subject();

  constructor(
    private pointEventRepository: PointEventRepository,
    @InjectQueue('sse') private sseQueue: Queue
    ){}

  async create(createPointEventDto: CreatePointEventDto) {
    if(createPointEventDto.hashString) {
      if(createPointEventDto.hash) {
        throw new Error('both hashString and hash provided')
      }
      createPointEventDto.hash = crypto.createHash('sha256').update(createPointEventDto.hashString).digest('base64');
      delete createPointEventDto.hashString;
    }

    const existing = await this.pointEventRepository.findOne(
      createPointEventDto.hash,
    );
    if (existing) {
      if (existing && existing.priority > createPointEventDto.priority) {
        return false;
      }

      return await this.update(createPointEventDto);
    }

    const retVal = await this.pointEventRepository.addPointEvent(
      createPointEventDto,
    );
    this.sseQueue.add(
      'updateSse',
      { userid: createPointEventDto.userid },
      { removeOnComplete: true },
    );

    return retVal;
  }

  @Process('updateSse')
  async processUpdateSse(job: Job<unknown>) {
    return (job.data as { userid: string }).userid;
  }

  @OnGlobalQueueCompleted()
  broadcastEvent(job: Job<unknown>, data: string) {
    const userid = JSON.parse(data);
    this.subject.next({
      userid: userid,
    });
  }

  async rewardAccountConnected(userid:string, platform: string) {
    const hashString = userid + "connectedaccount" + platform;
    return await this.create({
      hashString,
      userid,
      verb: 'connected',
      icon: 'right-to-bracket',
      platform: platform,
      points: parseInt(process.env.CONNECT_PLATFORM_POINTS),
      timestamp: new Date(),
      metadata: {},
      message: '',
      isBurn: false,
    })
  }

  async findAll() {
    return await this.pointEventRepository.findAll();
  }

  async findAllForUser(userid: string) {
    return await this.pointEventRepository.getPointEventsByUserId(userid)
  }

  findOne(id: number) {
    return `This action returns a #${id} pointEvent`;
  }

  async update(updatePointEventDto: UpdatePointEventDto) {
    return await this.pointEventRepository.updatePointEvent(
      updatePointEventDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} pointEvent`;
  }
}
