"use strict";
var RoleRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const Guild_1 = require("./Guild");
const _models_1 = require("../models");
let RoleRepository = RoleRepository_1 = class RoleRepository extends _structures_1.BaseRepository {
    async findOrInsert(discordRole, onlyId) {
        return typeorm_1.getConnection().transaction(async (entityManager) => {
            const roleRepo = entityManager.getCustomRepository(RoleRepository_1);
            let role = await roleRepo.find(discordRole, onlyId);
            if (!role) {
                const guildRepo = entityManager.getCustomRepository(Guild_1.GuildRepository);
                const guild = await guildRepo.findOrInsert(discordRole.guild, true);
                await roleRepo.createQueryBuilder('role')
                    .insert()
                    .values({ guild, id: discordRole.id, name: discordRole.name })
                    .execute();
                role = await roleRepo.find(discordRole, onlyId);
            }
            return role;
        });
    }
    async find(discordRole, onlyId) {
        if (onlyId) {
            return this.findQuery(discordRole)
                .select('role.id')
                .getOne();
        }
        return this.findQuery(discordRole).getOne();
    }
    findQuery(discordRole) {
        return this.createQueryBuilder('role')
            .where('role.id = :roleId', { roleId: discordRole.id });
    }
};
RoleRepository = RoleRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.Role)
], RoleRepository);
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=Role.js.map