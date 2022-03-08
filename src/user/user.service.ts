import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlatformConnectionService } from 'src/platform-connection/platform-connection.service';
import { UserRepository } from './user.repository';
import { EmailTemplateService } from 'src/email-template/email-template.service';
import { PointEventService } from 'src/point-event/point-event.service';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class UserService {

  constructor(
    private readonly platformConnectionService: PlatformConnectionService,
    private readonly userRepository: UserRepository,
    private readonly emailTemplateService: EmailTemplateService,
    private readonly pointEventService: PointEventService,
    private readonly queueService: QueueService
    ) {}
  
  async create(createUserDto: CreateUserDto) {
    if(!createUserDto.createdAt) {
      createUserDto.createdAt = new Date();
    }
    const createdUser = await this.userRepository.create(createUserDto);
    this.queueService.addUserIdToQueue(createUserDto.userid, new Date());
    return createdUser;
  }

  async findByUserId(userid: string) {
    const user = await this.userRepository.get(userid);
    if(!user) {
      throw new Error("User not found");
    }
    user.events = await this.pointEventService.findAllForUser(userid);
    user.connections = await this.platformConnectionService.findByUserId(userid);
    user.points = user.events.map((event) => event.points).reduce((previous, current) => previous + current, 0)

    return user;
  }

  async findAll() {
    const users = await this.userRepository.getAll();

    return users;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async syncPoints(userid) {
    await this.platformConnectionService.syncAllForUser(userid);
  }

  async triggerScheduledEmails(userid: string, currentCallDate: Date) {
    const user = await this.findByUserId(userid);
    this.emailTemplateService.processScheduled(user, currentCallDate)
  }
}
