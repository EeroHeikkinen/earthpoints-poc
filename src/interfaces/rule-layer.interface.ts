import { IPropertyWidget } from './property-widget.interface';

export interface IRuleLayer {
  options: any;
  build?();
  call(inputs): Promise<any>;
  toObject(): object;
  render(): string;
}
