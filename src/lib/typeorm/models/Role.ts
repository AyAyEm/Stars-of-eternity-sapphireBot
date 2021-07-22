import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { EternityBaseEntity } from '#structures';
import { Guild } from './Guild';

@Entity()
export class Role extends EternityBaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 19 })
  public id: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  public name: string;

  @ManyToOne(() => Guild)
  public guild: Guild;
}
