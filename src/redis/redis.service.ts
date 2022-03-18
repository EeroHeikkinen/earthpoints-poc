import { Injectable,Inject } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';

@Injectable()
export class RedisService {
  constructor(
    @Inject('DIST_EVENTS') private client: ClientRedis,
  ) {}

  emit(eventname: string,data: any){
    this.client.connect();
    this.client.emit<number>(eventname, data);
  }
}
