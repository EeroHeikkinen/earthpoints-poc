import { Injectable } from '@nestjs/common';
import { CreateUnsubscriptionDto } from './dto/create-unsubscription.dto';
import { Unsubscription } from './entities/unsubscription.entity';
import { UnsubscriptionRepository } from './unsubscription.repository';

@Injectable()
export class UnsubscribeService {
  constructor(
    private unsubscriptionRepository: UnsubscriptionRepository
  ) {}

  async add(createDto: CreateUnsubscriptionDto) {
      if(!createDto.templates)
        createDto.templates = [];
      const unsubscription = await this.unsubscriptionRepository.add(createDto)
      if(unsubscription && !unsubscription.templates)
        unsubscription.templates = [];
      return unsubscription;
  }

  async find(userid: string) {
    const unsubscription = await this.unsubscriptionRepository.find(userid)
    if(unsubscription && !unsubscription.templates)
      unsubscription.templates = [];
    return unsubscription;
  }

  getAllTemplates(unsubscription: Unsubscription) {
    if(!unsubscription.templates)
      unsubscription.templates = [];
    return [
      {template:'welcome',name:'Welcome Email', checked: unsubscription.templates.includes('welcome') },
      {template:'daily',name:'Daily Digest Trending Emails', checked: unsubscription.templates.includes('daily')}
    ]
  }


}
