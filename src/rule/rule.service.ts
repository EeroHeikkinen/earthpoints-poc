import { Injectable } from '@nestjs/common';
import { IPointRule } from 'src/interfaces/point-rule.interface';
import { PointEventService } from 'src/point-event/point-event.service';
import { TemplateService } from 'src/template/template.service';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { DemoPostRule } from './impl/demo-post-rule';
import { DemoShareRule } from './impl/demo-share-rule';
import { RuleRepository } from './rule.repository';

@Injectable()
export class RuleService {

    private rules: IPointRule[];
    
    constructor(
        //private ruleRepository: RuleRepository,
        //private templateService: TemplateService,
        private demoPostRule: DemoPostRule,
        private demoShareRule: DemoShareRule,
        private pointEventService: PointEventService
        ) {
            this.rules = [demoPostRule, demoShareRule]
        }

    async trigger(name:string, item) {
        for(const rule of this.rules) {
            const result = await rule.process(name, item)
            if(result) {
                await this.pointEventService.create(result)
                console.log("MATCH!!!" + JSON.stringify(result))
            }
        }
    }
}
