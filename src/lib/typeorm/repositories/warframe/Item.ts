import { EntityRepository, getConnection } from 'typeorm';

import type { Item as WarframeItem } from 'warframe-items';

import { BaseRepository } from '#structures';
import { Item } from '#models';

@EntityRepository(Item)
export class ItemRepository extends BaseRepository<Item> {
  public async findOrInsert(warframeItem: WarframeItem, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const itemRepo = entityManager.getCustomRepository(ItemRepository);
      let item = await itemRepo.find(warframeItem, onlyId);

      if (!item) {
        await itemRepo.createQueryBuilder('item')
          .insert()
          .into(Item)
          .values({ name: warframeItem.name })
          .execute();

        item = await itemRepo.find(warframeItem, onlyId);
      }

      return item;
    });
  }

  public async find(warframeItem: WarframeItem, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(warframeItem)
        .select('item.id')
        .getOne();
    }

    return this.findQuery(warframeItem).getOne();
  }

  public findQuery(warframeItem: WarframeItem) {
    return this.createQueryBuilder('item')
      .where('item.name = :itemName', { itemName: warframeItem.name });
  }
}
