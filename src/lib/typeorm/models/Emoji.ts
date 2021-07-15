import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

import { EternityBaseEntity } from '#structures';

@Entity()
export class Emoji extends EternityBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public snowflakeId: string;

  @Index()
  @Column({ type: 'varchar', length: 19, nullable: false, unique: true })
  public identifier: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;
}
