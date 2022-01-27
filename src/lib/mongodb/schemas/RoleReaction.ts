import { prop, Ref } from '@typegoose/typegoose';

import { Role } from './Role';
import { Message } from './Message';

export class RoleReaction {
  @prop({ ref: () => Message })
  public message: Ref<Message, string>;

  @prop({ ref: () => Role, type: () => String })
  public role: Ref<Role, string>;

  @prop()
  public emoji: string;
}
