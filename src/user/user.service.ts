import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExtractorService } from 'src/extractor/extractor.service';
import { SocialCredentialService } from 'src/social-credential/social-credential.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly extractorService: ExtractorService,
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

  async findAll() {
    const users = await this.userRepository.getAll();

    return users;
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
      return 1;
  }
}
