import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PointEventService } from 'src/point-event/point-event.service';

@Controller('redis')
export class RedisMicroController {
  constructor(private readonly pointEventService: PointEventService) {}

  @EventPattern('point.event.create')
  async pointEventCreate(data: any) {
    this.pointEventService.subject.next({
      userid: data.userid
    });//*/
  }  

}
