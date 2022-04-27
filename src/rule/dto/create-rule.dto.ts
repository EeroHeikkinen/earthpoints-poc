import { IRuleTemplate } from 'src/interfaces/point-rule.interface';

export class CreateRuleDto {
  id: string;
  name: string;
  template: string;
  templateObj?: IRuleTemplate;
  description?: string;
  layersJson?: string;
  options?: any;
  filter?: Map<string, string>;
}
