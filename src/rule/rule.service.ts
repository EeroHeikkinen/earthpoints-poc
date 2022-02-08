import { Injectable } from '@nestjs/common';
import { TemplateService } from 'src/template/template.service';
import { Repository } from 'typeorm';
import { RuleRepository } from './rule.repository';

@Injectable()
export class RuleService {
    
    constructor(
        //private ruleRepository: RuleRepository,
        //private templateService: TemplateService
        ) {

        }

    async trigger(name:string, item) {
        console.log("Trigger: " + name + " msg: " + item.message)
        //const rules= await this.ruleRepository.getByTrigger(name);
        //rules.forEach((rule) => {
            //this.templateService.process(rule.template, rule.options, item)
        //})
    }
}
