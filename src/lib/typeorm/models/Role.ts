import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Guild } from './Guild';

import type { Message } from './Message';

@Entity()
export class Role extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 250, nullable: false })
  public name: string;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToOne(() => Guild)
  public guild: Guild;

  @ManyToMany('Message', (message: Message) => message.roles)
  public messages: Message[];
}
