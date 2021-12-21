import { getModelForClass, prop } from '@typegoose/typegoose';

export class Item {
  @prop()
  public name: string;
}
export const ItemModel = getModelForClass(Item);
