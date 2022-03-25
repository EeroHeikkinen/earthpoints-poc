import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { CreatePointEventDto } from './dto/create-point-event.dto';
import { UpdatePointEventDto } from './dto/update-point-event.dto';
import { PointEventRepository } from './point-event.repository';
var crypto = require('crypto');

@Injectable()
export class PointEventService {

  public subject = new Subject();

  constructor(
    private pointEventRepository: PointEventRepository,
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
    if (existing && existing.priority > createPointEventDto.priority) {
      return false;
    }

    const retVal = await this.pointEventRepository.addPointEvent(
      createPointEventDto,
    );
    this.subject.next({
      userid: createPointEventDto.userid,
      retVal,
    });
    return retVal;
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
      metadata: new Map<string, string>(),
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

  update(id: number, updatePointEventDto: UpdatePointEventDto) {
    return `This action updates a #${id} pointEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} pointEvent`;
  }
}
