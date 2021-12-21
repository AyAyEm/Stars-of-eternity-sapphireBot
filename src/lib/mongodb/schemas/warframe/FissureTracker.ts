import { prop } from '@typegoose/typegoose';

export class FissureTracker {
  @prop({ type: String, default: [] })
  public messages: string[];

  @prop()
  public channel: string;

  @prop()
  public enabled: boolean;
}
