import { EntityRepository, getConnection } from 'typeorm';

import type { Item } from 'warframe-items';

import { BaseRepository } from '#structures';
import { WarframeItem } from '#models';

@EntityRepository(WarframeItem)
export class WarframeItemRepo extends BaseRepository<Item> {
  public async findOrInsert(warframeItem: Item, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const itemRepo = entityManager.getCustomRepository(WarframeItemRepo);
      let item = await itemRepo.find(warframeItem, onlyId);

      if (!item) {
        await itemRepo.createQueryBuilder('item')
          .insert()
          .into(WarframeItem)
          .values({ name: warframeItem.name })
          .execute();

        item = await itemRepo.find(warframeItem, onlyId);
      }

      return item;
    });
  }

  public async find(warframeItem: Item, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(warframeItem)
        .select('item.id')
        .getOne();
    }

    return this.findQuery(warframeItem).getOne();
  }

  public findQuery(warframeItem: Item) {
    return this.createQueryBuilder('item')
      .where('item.name = :itemName', { itemName: warframeItem.name });
  }
}
