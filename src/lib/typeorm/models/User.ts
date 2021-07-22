import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { Guild } from './Guild';

@Entity()
export class User extends EternityBaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 19 })
  public id: string;

  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  public name: string;

  @ManyToMany('Guild', (guild: Guild) => guild.users)
  public guilds: Guild[];
}
