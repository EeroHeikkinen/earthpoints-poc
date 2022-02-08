import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SocialCredential } from '../social-credential/entities/social-credential.entity';
import { SocialCredentialRepository } from 'src/social-credential/social-credential.repository';
import { AdapterService } from 'src/adapter/adapter.service';
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly adapterService: AdapterService,
    private readonly socialCredentialService: SocialCredentialService,
    private readonly userRepository: UserRepository
    ) {}
  
  async create(createUserDto?: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findByUserId(userid: string) {
    return await this.userRepository.get(userid);
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

  async calculatePoints(userid) {
      const credentials = await this.socialCredentialService.findByUserId(userid);
      credentials.forEach((credential) => {
        const adapter = this.adapterService.findOne(credential.platform);  

        adapter.syncUser(credential)
      })
      return 1;
  }
}
