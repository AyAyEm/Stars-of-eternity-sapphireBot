import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Guild } from '#models/Guild';
import { User } from '#models/User';

@Entity()
export class WarframeItem extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  public name: string;

  @ManyToMany(() => Guild)
  @JoinTable({ name: 'item_guild' })
  public guilds: Guild[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'item_user' })
  public users: User[];
}
