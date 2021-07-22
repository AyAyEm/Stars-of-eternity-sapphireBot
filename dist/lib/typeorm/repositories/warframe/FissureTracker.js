"use strict";
var FissureTrackerRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FissureTrackerRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
const _models_1 = require("../../models");
const Channel_1 = require("../Channel");
const Message_1 = require("../Message");
const _utils_1 = require("../../../utils");
let FissureTrackerRepository = FissureTrackerRepository_1 = class FissureTrackerRepository extends _structures_1.BaseRepository {
    tiers = Array.from({ length: 5 }, (_, i) => i + 1);
    async findOrInsertAll(discordChannel, onlyId) {
        const fissureTrackers = [];
        for (const tier of this.tiers) {
            // eslint-disable-next-line no-await-in-loop
            fissureTrackers.push(await this.findOrInsert(discordChannel, tier, onlyId));
        }
        return fissureTrackers;
    }
    async findOrInsert(discordChannel, tier, onlyId) {
        return typeorm_1.getConnection().transaction(async (entityManager) => {
            const fissureTrackerRepo = entityManager.getCustomRepository(FissureTrackerRepository_1);
            let fissure = await fissureTrackerRepo.find(discordChannel, tier, onlyId);
            if (!fissure) {
                const channelRepo = entityManager.getCustomRepository(Channel_1.ChannelRepository);
                const messageRepo = entityManager.getCustomRepository(Message_1.MessageRepository);
                const channel = await channelRepo.findOrInsert(discordChannel, true);
                const discordMessage = await discordChannel.send(_utils_1.placeHolder());
                await messageRepo.insert(discordMessage, entityManager);
                const message = await messageRepo.find(discordMessage, true);
                await fissureTrackerRepo.createQueryBuilder('fissureTracker')
                    .insert()
                    .values({ tier, channel, message })
                    .execute();
                fissure = await fissureTrackerRepo.find(discordChannel, tier, onlyId);
            }
            return fissure;
        });
    }
    async findAll(discordChannel, onlyId) {
        return Promise.all(this.tiers.map((tier) => this.find(discordChannel, tier, onlyId)));
    }
    async find(discordChannel, tier, onlyId) {
        if (onlyId) {
            return this.findQuery(discordChannel, tier)
                .select('fissureTracker.id')
                .getOne();
        }
        return this.findQuery(discordChannel, tier).getOne();
    }
    findQuery(discordChannel, tier) {
        return this.createQueryBuilder('fissureTracker')
            .leftJoin('fissureTracker.channel', 'channel')
            .where('channel.id = :channelId', { channelId: discordChannel.id })
            .andWhere('fissureTracker.tier = :tier', { tier });
    }
    async delete(fissureTrackers) {
        return this.createQueryBuilder()
            .delete()
            .where('fissure_tracker.id IN (:...fissureIds)', { fissureIds: fissureTrackers.map(({ id }) => id) })
            .execute();
    }
};
FissureTrackerRepository = FissureTrackerRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.FissureTracker)
], FissureTrackerRepository);
exports.FissureTrackerRepository = FissureTrackerRepository;
//# sourceMappingURL=FissureTracker.js.map