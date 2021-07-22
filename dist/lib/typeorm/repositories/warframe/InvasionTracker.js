"use strict";
var InvasionTrackerRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvasionTrackerRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
const _models_1 = require("../../models");
const Channel_1 = require("../Channel");
let InvasionTrackerRepository = InvasionTrackerRepository_1 = class InvasionTrackerRepository extends _structures_1.BaseRepository {
    async findOrInsert(discordChannel, onlyId) {
        return typeorm_1.getConnection().transaction(async (entityManager) => {
            const invasionTrackerRepo = entityManager.getCustomRepository(InvasionTrackerRepository_1);
            let invasionTracker = await invasionTrackerRepo
                .findByChannel(discordChannel, onlyId);
            if (!invasionTracker) {
                const channelRepo = entityManager.getCustomRepository(Channel_1.ChannelRepository);
                const channel = await channelRepo.findOrInsert(discordChannel);
                await entityManager.createQueryBuilder()
                    .insert()
                    .into(_models_1.InvasionTracker)
                    .values([{ channel }])
                    .execute();
                invasionTracker = await invasionTrackerRepo.findByChannel(discordChannel, onlyId);
            }
            return invasionTracker;
        });
    }
    async findByChannel(discordChannel, onlyId = false) {
        const query = await this.findByChannelQuery(discordChannel);
        if (onlyId) {
            return query
                .select('invasionTracker.id')
                .getOne();
        }
        return query.getOne();
    }
    async findByChannelQuery(discordChannel) {
        return this.createQueryBuilder('invasionTracker')
            .leftJoinAndSelect('invasionTracker.channel', 'channel')
            .where('channel.id = :channelId', { channelId: discordChannel.id });
    }
    async findItemsByChannel(discordChannel) {
        const invasionTracker = await this.findByChannel(discordChannel, true);
        return (await this
            .createQueryBuilder()
            .relation(_models_1.InvasionTracker, 'items')
            .of(invasionTracker)
            .loadMany()) ?? [];
    }
};
InvasionTrackerRepository = InvasionTrackerRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.InvasionTracker)
], InvasionTrackerRepository);
exports.InvasionTrackerRepository = InvasionTrackerRepository;
//# sourceMappingURL=InvasionTracker.js.map