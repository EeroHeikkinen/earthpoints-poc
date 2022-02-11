import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SocialCredential } from '../social-credential/entities/social-credential.entity';
import { SocialCredentialRepository } from 'src/social-credential/social-credential.repository';
import { AdapterService } from 'src/adapter/adapter.service';
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserRepository } from './user.repository';
import { PointEventService } from 'src/point-event/point-event.service';

@Injectable()
export class UserService {
  constructor(
    private readonly adapterService: AdapterService,
    private readonly pointEventService: PointEventService,
    private readonly socialCredentialService: SocialCredentialService,
    private readonly userRepository: UserRepository
    ) {}
  
  async create(createUserDto?: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
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
        const adapter = this.adapterService.findOne(credential.platform);  

        await adapter.syncUser(credential)
      }
      return 1;
  }
}
