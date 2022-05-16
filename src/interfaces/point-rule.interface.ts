import { CreatePointEventDto } from 'src/point-event/dto/create-point-event.dto';
import { User } from 'src/user/entities/user.entity';
import { IPropertyWidget } from './property-widget.interface';
import { IRuleLayer } from './rule-layer.interface';

export interface IRuleTemplate {
  initLayers(): Promise<IRuleLayer[]>;
  reward(eventName, item, options): Promise<CreatePointEventDto | false>;
  description: string;
  title: string;
}
