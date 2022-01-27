import { prop, Ref } from '@typegoose/typegoose';

import { Channel } from './Channel';
import { Role } from './Role';
import { User } from './User';

export class Guild {
  @prop()
  public _id: string;

  @prop({ ref: () => Channel, type: () => String })
  public channels: Ref<Channel, string>[];

  @prop({ ref: () => Role, type: () => String })
  public roles: Ref<Role, string>[];

  @prop({ ref: () => User, type: () => String })
  public members: Ref<User, string>[];
}
