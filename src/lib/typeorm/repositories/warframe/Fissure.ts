import { EntityRepository } from 'typeorm';

import { BaseRepository } from '#structures';
import { Fissure } from '#models';

import type { Fissure as WarframeFissure } from '#lib/types/Warframe';

@EntityRepository(Fissure)
export class FissureRepository extends BaseRepository<Fissure> {
  public async findLatest() {
    return this.createQueryBuilder('fissure')
      .orderBy('fissure.activation', 'DESC')
      .getOne();
  }

  public async insert(fissures: WarframeFissure[]) {
    return this.createQueryBuilder('fissure')
      .insert()
      .values(fissures.map(({ activation, id }) => ({ activation, apiId: id })))
      .execute();
  }
}
