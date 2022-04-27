import { ItemSet } from 'src/filter/entities/item-set.model';

export interface IPropertyWidget {
  preprocess: (item: ItemSet) => Promise<ItemSet>;
  readonly id: string;
}
