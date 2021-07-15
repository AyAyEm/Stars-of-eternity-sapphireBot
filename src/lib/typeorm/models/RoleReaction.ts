import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Message } from './Message';
import { Role } from './Role';
import { Emoji } from './Emoji';

@Entity()
export class RoleReaction extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Message)
  public message: Message;

  @ManyToOne(() => Role)
  public role: Role;

  @ManyToOne(() => Emoji)
  public emoji: Emoji;
}
