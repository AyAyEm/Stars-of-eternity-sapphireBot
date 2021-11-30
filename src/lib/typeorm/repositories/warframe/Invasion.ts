import { EntityRepository } from 'typeorm';

import { BaseRepository } from '#structures';
import { WarframeInvasion } from '#models';
import { strToMs } from '#lib/utils';

import type { InvasionData } from '#lib/types/Warframe';

@EntityRepository(WarframeInvasion)
export class WarframeInvasionRepo extends BaseRepository<WarframeInvasion> {
  public async findLatest() {
    return this.createQueryBuilder('invasion')
      .orderBy('invasion.activation', 'DESC')
      .getOne();
  }

  public async insert(invasions: InvasionData[]) {
    return this.createQueryBuilder('invasion')
      .insert()
      .values(invasions.map(({ activation, id }) => ({ activation: `${strToMs(activation)}`, apiId: id })))
      .execute();
  }
}
