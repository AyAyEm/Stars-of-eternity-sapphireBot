"use strict";
var ChannelRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const _models_1 = require("../models");
const Guild_1 = require("./Guild");
let ChannelRepository = ChannelRepository_1 = class ChannelRepository extends _structures_1.BaseRepository {
    async findOrInsert(discordChannel, onlyId) {
        return typeorm_1.getConnection().transaction(async (entityManager) => {
            const channelsRepo = entityManager.getCustomRepository(ChannelRepository_1);
            let channel = await channelsRepo.find(discordChannel, onlyId);
            if (!channel) {
                const guildRepo = entityManager.getCustomRepository(Guild_1.GuildRepository);
                const guild = await guildRepo.findOrInsert(discordChannel.guild, true);
                await entityManager.createQueryBuilder()
                    .insert()
                    .into(_models_1.Channel)
                    .values([{ id: discordChannel.id, name: discordChannel.name, guild }])
                    .execute();
                channel = await channelsRepo.find(discordChannel, onlyId);
            }
            return channel;
        });
    }
    async find(discordChannel, onlyId) {
        if (onlyId) {
            return this.findQuery(discordChannel)
                .select('channel.id')
                .getOne();
        }
        return this.findQuery(discordChannel).getOne();
    }
    findQuery(discordChannel) {
        return this.createQueryBuilder('channel')
            .where('channel.id = :channelId', { channelId: discordChannel.id });
    }
};
ChannelRepository = ChannelRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.Channel)
], ChannelRepository);
exports.ChannelRepository = ChannelRepository;
//# sourceMappingURL=Channel.js.map