import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Message } from './Message';
import { Role } from './Role';

@Entity()
export class RoleReaction extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Message, { nullable: false })
  public message: Message;

  @ManyToOne(() => Role, { nullable: false })
  public role: Role;

  @Column({ type: 'varchar', length: 19, nullable: false })
  public emoji: string;
}
