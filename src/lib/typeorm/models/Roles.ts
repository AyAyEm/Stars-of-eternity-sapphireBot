import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

import { Guilds } from './Guilds';

import type { Messages } from './Messages';

@Entity()
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 250, nullable: false })
  public name: string;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @ManyToOne(() => Guilds)
  public guild: Guilds;

  @ManyToMany('Messages', (message: Messages) => message.roles)
  public messages: Messages[];
}
