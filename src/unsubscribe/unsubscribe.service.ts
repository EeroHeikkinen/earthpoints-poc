import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EmailTemplateService } from 'src/email-template/email-template.service';
import { CreateUnsubscriptionDto } from './dto/create-unsubscription.dto';
import { Unsubscription } from './entities/unsubscription.entity';
import { UnsubscriptionRepository } from './unsubscription.repository';

@Injectable()
export class UnsubscribeService {
  constructor(
    private unsubscriptionRepository: UnsubscriptionRepository,
    @Inject(forwardRef(() => EmailTemplateService))
    private emailTemplateService: EmailTemplateService
  ) {}

  async add(createDto: CreateUnsubscriptionDto) {
      if(!createDto.templates)
        createDto.templates = [];
      return await this.unsubscriptionRepository.add(createDto)
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
    const templates = [...this.emailTemplateService.templates.values()]
    return templates.filter((v,i,a) => {
      return v.getName() !== 'welcome-message';
    }).map<any>((v,i,a) => {
      return {
        template: v.getName(),
        name: v.getFullname(),
        checked: unsubscription.templates.includes(v.getName())
      };
    });
  }

  async checkUnsubscription(userid: string, template: string) {
    const unsubscription = await this.find(userid);
    if(!unsubscription)
      return false;
    return unsubscription.templates.includes(template);
  }

  async findAll() {
    const result = await this.unsubscriptionRepository.findAll();
    return result;
  }

}
