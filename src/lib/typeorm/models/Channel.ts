import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Guild } from './Guild';

import type { Message } from './Message';

@Entity()
export class Channel extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;

  @OneToMany('Message', (message: Message) => message.channel)
  public messages: Message[];

  @ManyToOne('Guild', (guild: Guild) => guild.channels)
  public guild: Guild;
}
