import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';

import { Guilds } from '#models/Guilds';
import { Users } from '#models/Users';

@Entity({ schema: 'warframe' })
export class Items extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  public name: string;

  @ManyToMany(() => Guilds)
  @JoinTable({ name: 'invasion_item_guild' })
  public guilds: Guilds[];

  @ManyToMany(() => Users)
  @JoinTable({ name: 'item_user' })
  public users: Users[];
}
