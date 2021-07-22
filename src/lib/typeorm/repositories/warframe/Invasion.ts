import { EntityRepository } from 'typeorm';

import { BaseRepository } from '#structures';
import { Invasion } from '#models';

import type { InvasionData } from '#lib/types/Warframe';

@EntityRepository(Invasion)
export class InvasionRepository extends BaseRepository<Invasion> {
  public async findLatest() {
    return this.createQueryBuilder('invasion')
      .orderBy('invasion.activation', 'DESC')
      .getOne();
  }

  public async insert(invasions: InvasionData[]) {
    return this.createQueryBuilder('invasion')
      .insert()
      .values(invasions.map(({ activation, id }) => ({ activation, apiId: id })))
      .execute();
  }
}
