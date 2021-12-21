import { prop, Ref } from '@typegoose/typegoose';

import { Item } from './Item';

export class InvasionTracker {
  @prop({ ref: () => Item, default: [] })
  public items: Ref<Item>[];

  @prop({ type: String })
  public channel: string;

  @prop()
  public enabled: boolean;
}
