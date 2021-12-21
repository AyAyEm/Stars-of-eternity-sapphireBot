import { prop } from '@typegoose/typegoose';

export class Message {
  @prop()
  public _id: string;
}
