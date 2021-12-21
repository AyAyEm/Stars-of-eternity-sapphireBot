import { prop, Ref } from '@typegoose/typegoose';

import { Message } from './Message';

export class Channel {
  @prop()
  public _id: string;

  @prop({ ref: () => Message, type: String })
  public messages: Ref<Message, string>[];
}
