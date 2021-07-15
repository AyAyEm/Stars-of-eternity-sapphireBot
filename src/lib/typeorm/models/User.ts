import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';

import type { Guild } from './Guild';

@Entity()
export class User extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  public name: string;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToMany('Guild', (guild: Guild) => guild.users)
  public guilds: Guild[];
}
