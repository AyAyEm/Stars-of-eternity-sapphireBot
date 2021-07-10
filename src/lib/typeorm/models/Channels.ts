import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

import { Guilds } from './Guilds';

import type { Messages } from './Messages';

@Entity()
export class Channels extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;

  @OneToMany('Messages', (message: Messages) => message.channel)
  public messages: Messages[];

  @ManyToOne('Guilds', (guild: Guilds) => guild.channels)
  public guild: Guilds;
}
