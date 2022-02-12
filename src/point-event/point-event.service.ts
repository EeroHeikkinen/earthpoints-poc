import { Injectable } from '@nestjs/common';
import { CreatePointEventDto } from './dto/create-point-event.dto';
import { UpdatePointEventDto } from './dto/update-point-event.dto';
import { PointEventRepository } from './point-event.repository';

@Injectable()
export class PointEventService {
  constructor(
    private pointEventRepository: PointEventRepository,
    ){}

  async create(createPointEventDto: CreatePointEventDto) {
    return await this.pointEventRepository.addPointEvent(createPointEventDto)
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
