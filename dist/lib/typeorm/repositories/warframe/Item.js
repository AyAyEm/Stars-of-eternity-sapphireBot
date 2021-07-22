"use strict";
var ItemRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
const _models_1 = require("../../models");
let ItemRepository = ItemRepository_1 = class ItemRepository extends _structures_1.BaseRepository {
    async findOrInsert(warframeItem, onlyId) {
        return typeorm_1.getConnection().transaction(async (entityManager) => {
            const itemRepo = entityManager.getCustomRepository(ItemRepository_1);
            let item = await itemRepo.find(warframeItem, onlyId);
            if (!item) {
                await itemRepo.createQueryBuilder('item')
                    .insert()
                    .into(_models_1.Item)
                    .values({ name: warframeItem.name })
                    .execute();
                item = await itemRepo.find(warframeItem, onlyId);
            }
            return item;
        });
    }
    async find(warframeItem, onlyId) {
        if (onlyId) {
            return this.findQuery(warframeItem)
                .select('item.id')
                .getOne();
        }
        return this.findQuery(warframeItem).getOne();
    }
    findQuery(warframeItem) {
        return this.createQueryBuilder('item')
            .where('item.name = :itemName', { itemName: warframeItem.name });
    }
};
ItemRepository = ItemRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.Item)
], ItemRepository);
exports.ItemRepository = ItemRepository;
//# sourceMappingURL=Item.js.map