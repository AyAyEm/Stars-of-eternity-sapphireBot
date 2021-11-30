import { EntityRepository } from 'typeorm';

import { BaseRepository } from '#structures';
import { WarframeFissure } from '#models';
import { strToMs } from '#utils';

import type { Fissure } from '#lib/types/Warframe';

@EntityRepository(WarframeFissure)
export class WarframeFissureRepo extends BaseRepository<Fissure> {
  public async findLatest() {
    return this.createQueryBuilder('fissure')
      .orderBy('fissure.activation', 'DESC')
      .getOne();
  }

  public async insert(fissures: Fissure[]) {
    return this.createQueryBuilder('fissure')
      .insert()
      .values(fissures.map(({ activation, id }) => ({ activation: `${strToMs(activation)}`, apiId: id })))
      .execute();
  }
}
