import { Injectable } from '@nestjs/common';
import { CreateSocialCredentialDto } from './dto/create-social-credential.dto';
import { UpdateSocialCredentialDto } from './dto/update-social-credentials.dto';
import { SocialCredentialRepository } from './social-credential.repository';

@Injectable()
export class SocialCredentialService {
  async findByUserId(userid: any) {
    return await this.socialCredentialRepository.findByUserId(userid);
  }

  async findByProfileIdAndPlatform(profileid: string, platform: string) {
    return await this.socialCredentialRepository.findByProfileIdAndPlatform(profileid, platform)
  }
  constructor(
    private readonly socialCredentialRepository: SocialCredentialRepository,
    ) {}

  async create(createSocialCredentialDto: CreateSocialCredentialDto) {
    return await this.socialCredentialRepository.addSocialCredential(createSocialCredentialDto);
  }

  findAll() {
    return `This action returns all socialProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialProfile`;
  }

  async update(updateSocialCredentialDto: UpdateSocialCredentialDto) {
    return await this.socialCredentialRepository.updateSocialCredential(updateSocialCredentialDto);
  }

  remove(id: number) {
    return `This action removes a #${id} socialProfile`;
  }
}
