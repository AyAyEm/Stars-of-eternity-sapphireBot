import { prop, Ref } from '@typegoose/typegoose';

import type { Guild } from './Guild';

export class User {
  @prop()
  public _id: string;

  @prop({ ref: 'Guild', type: () => String })
  public guilds: Ref<Guild, string>[];
}
