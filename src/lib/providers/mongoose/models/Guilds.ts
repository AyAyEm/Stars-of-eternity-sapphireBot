/* eslint-disable max-classes-per-file */
import { prop } from '@typegoose/typegoose';

export class RelicTracker {
  @prop()
  enabled: boolean;

  @prop({ _id: false })
  messages: Map<string, string>;
}

export class InvasionItems {
  @prop()
  enabled: boolean;

  @prop({ type: () => [String] })
  items: string[];
}

export class EmojiRole {
  @prop()
  public roleId: string;
}

export class Message {
  @prop()
  public msgType?: string;

  @prop()
  public title?: string;

  @prop({ _id: false, type: String })
  public emojiRoleMap?: Map<string, string>;
}

export class Channel {
  @prop({ _id: false })
  public relicTracker: RelicTracker;

  @prop({ _id: false })
  public invasionItems: InvasionItems;

  @prop({ _id: false, type: Message })
  public messages: Map<string, Message>;
}

export class Member {
  @prop({ default: false })
  public toFollow: boolean;
}

export class Guilds {
  @prop()
  public id: string;

  @prop()
  public name: string;

  @prop({ _id: false, type: Member })
  public members: Map<string, Member>;

  @prop({ _id: false, type: Channel })
  public channels: Map<string, Channel>;
}
