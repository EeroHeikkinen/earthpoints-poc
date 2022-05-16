import { Injectable } from '@nestjs/common';
import { IRuleTemplate } from 'src/interfaces/point-rule.interface';

import * as dotenv from 'dotenv';
import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { IPropertyWidget } from 'src/interfaces/property-widget.interface';
import { IRuleLayer } from 'src/interfaces/rule-layer.interface';
dotenv.config();

@Injectable()
export abstract class BaseRuleTemplate implements IRuleTemplate {
  rules?: any[];

  preprocess(item: any) {
    return item;
  }

  onPointEvent?(): Promise<false | CreatePointEventDto> {
    throw new Error('Method not implemented.');
  }

  abstract initLayers(): Promise<IRuleLayer[]>;

  public options(): { [key: string]: IPropertyWidget } {
    return {};
  }

  public abstract readonly title;
  public abstract readonly description;

  abstract reward(
    eventName: string,
    item: any,
    options: any,
  ): Promise<false | CreatePointEventDto>;
}
