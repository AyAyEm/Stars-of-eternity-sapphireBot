import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';

import { Messages } from './Messages';
import { Roles } from './Roles';
import { Emojis } from './Emojis';

@Entity()
export class RoleReactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Messages)
  public message: Messages;

  @ManyToOne(() => Roles)
  public role: Roles;

  @ManyToOne(() => Emojis)
  public emoji: Emojis;
}
