"use strict";
var GuildRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const _models_1 = require("../models");
let GuildRepository = GuildRepository_1 = class GuildRepository extends _structures_1.BaseRepository {
    async findOrInsert(discordGuild, onlyId) {
        return typeorm_1.getConnection().transaction(async (entityManager) => {
            const guildsRepo = entityManager.getCustomRepository(GuildRepository_1);
            let guild = await guildsRepo.find(discordGuild, onlyId);
            if (!guild) {
                await guildsRepo.createQueryBuilder()
                    .insert()
                    .into(_models_1.Guild)
                    .values([{ id: discordGuild.id }])
                    .execute();
                guild = await guildsRepo.find(discordGuild, onlyId);
            }
            return guild;
        });
    }
    async find(discordGuild, onlyId) {
        if (onlyId) {
            return this.findQuery(discordGuild)
                .select('guild.id')
                .getOne();
        }
        return this.findQuery(discordGuild).getOne();
    }
    findQuery(discordGuild) {
        return this.createQueryBuilder('guild')
            .where('guild.id = :guildId', { guildId: discordGuild.id });
    }
};
GuildRepository = GuildRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.Guild)
], GuildRepository);
exports.GuildRepository = GuildRepository;
//# sourceMappingURL=Guild.js.map