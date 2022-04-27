import { IRuleTemplate } from 'src/interfaces/point-rule.interface';
import { IRuleLayer } from 'src/interfaces/rule-layer.interface';

export class Rule {
  id: string;
  name: string;
  template: string;
  templateObj: IRuleTemplate;
  description: string;
  layersJson: string;
  layers: IRuleLayer[];
  options: Map<string, string>;
  filter: Map<string, string>;
}
