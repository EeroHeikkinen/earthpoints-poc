import { Injectable } from '@nestjs/common';
import { PointEventService } from 'src/point-event/point-event.service';
import { TemplateService } from 'src/template/template.service';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { DemoSaveSoilRule } from './impl/demo-save-soil.rule';
import { RuleRepository } from './rule.repository';

@Injectable()
export class RuleService {
    
    constructor(
        //private ruleRepository: RuleRepository,
        //private templateService: TemplateService,
        private demoSaveSoilRule: DemoSaveSoilRule,
        private pointEventService: PointEventService
        ) {

        }

    async trigger(name:string, item) {
        //console.log("Trigger: " + name + " msg: " + item.message)
        const result = await this.demoSaveSoilRule.process(name, item)
        if(result) {
            await this.pointEventService.create(result)
            console.log("MATCH!!!" + JSON.stringify(result))
        }
    }
}
