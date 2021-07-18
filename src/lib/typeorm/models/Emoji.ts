import { Entity, PrimaryColumn, Column } from 'typeorm';

import { EternityBaseEntity } from '#structures';

@Entity()
export class Emoji extends EternityBaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 19 })
  public id: string;

  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public identifier: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;
}
