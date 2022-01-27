import { prop } from '@typegoose/typegoose';

export class Role {
  @prop()
  public _id: string;
}
