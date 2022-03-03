import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SocialCredential } from '../social-credential/entities/social-credential.entity';
import { SocialCredentialRepository } from 'src/social-credential/social-credential.repository';
import { ExtractorService } from 'src/extractor/extractor.service';
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserRepository } from './user.repository';
import { PointEventService } from 'src/point-event/point-event.service';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class UserService {
  constructor(
    private readonly extractorService: ExtractorService,
    private readonly pointEventService: PointEventService,
    private readonly socialCredentialService: SocialCredentialService,
    private readonly userRepository: UserRepository,
    private readonly queueService: QueueService
    ) {}
  
  async create(createUserDto?: CreateUserDto) {
    const createResult = await this.userRepository.create(createUserDto);
    this.queueService.addUserIdToQueue(createUserDto.userid);
    return createResult;
  }

  async findByUserId(userid: string) {
    const user = await this.userRepository.get(userid);

    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async syncPoints(userid) {
      const credentials = await this.socialCredentialService.findByUserId(userid);
      for(const credential of credentials) {
        const adapter = this.extractorService.findOne(credential.platform);  

        await adapter.extractEvents(credential)
      }

      //TODO: Consider if this is the correct place to add que...
      //this.queueService.addUserIdToQueue(userid);
      return 1;
  }
}
