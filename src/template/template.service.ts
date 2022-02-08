import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateService {
    constructor(){}

    process(template: string, options: Map<string, string>, item: any) {
        throw new Error('Method not implemented.');
    }
}
