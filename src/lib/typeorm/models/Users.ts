import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToMany,
  BaseEntity,
} from 'typeorm';

import type { Guilds } from './Guilds';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  public name: string;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToMany('Guilds', (guild: Guilds) => guild.users)
  public guilds: Guilds[];
}
