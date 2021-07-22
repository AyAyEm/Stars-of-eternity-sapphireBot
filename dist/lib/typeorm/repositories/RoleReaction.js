"use strict";
var RoleReactionRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleReactionRepository = void 0;
const tslib_1 = require("tslib");
/* eslint-disable import/export */
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const _models_1 = require("../models");
const Role_1 = require("./Role");
const Message_1 = require("./Message");
let RoleReactionRepository = RoleReactionRepository_1 = class RoleReactionRepository extends _structures_1.BaseRepository {
    async findOrInsert(insertOptions, onlyId) {
        return typeorm_1.getConnection().transaction(async (manager) => {
            const roleReactionRepo = manager.getCustomRepository(RoleReactionRepository_1);
            let roleReaction = await roleReactionRepo.findByMessage(insertOptions.discordMessage, onlyId);
            if (!roleReaction) {
                await roleReactionRepo.insert(insertOptions, manager);
                roleReaction = await roleReactionRepo.findByMessage(insertOptions.discordMessage, onlyId);
            }
            return roleReaction;
        });
    }
    async insert(options, manager) {
        const { discordMessage, roleReaction } = options;
        const getRepo = manager ? manager.getCustomRepository : typeorm_1.getCustomRepository;
        const roleReactions = [...roleReaction.entries()];
        const toInsert = await Promise.all(roleReactions.map(async ([discordRoleId, reaction]) => {
            const roleRepo = getRepo(Role_1.RoleRepository);
            const discordRole = await discordMessage.guild.roles.fetch(discordRoleId);
            const role = await roleRepo.findOrInsert(discordRole, true);
            const messageRepo = getRepo(Message_1.MessageRepository);
            const message = await messageRepo.findOrInsert(discordMessage, true);
            return { role, message, emoji: reaction };
        }));
        return this.createQueryBuilder('roleReaction')
            .insert()
            .values(toInsert)
            .execute();
    }
    async findByMessage(discordMessage, onlyId) {
        if (onlyId) {
            return this.findByMessageQuery(discordMessage)
                .select('roleReaction.id')
                .getMany();
        }
        return this.findByMessageQuery(discordMessage).getMany();
    }
    findByMessageQuery(discordMessage) {
        return this.createQueryBuilder('roleReaction')
            .leftJoinAndSelect('roleReaction.role', 'role')
            .leftJoinAndSelect('roleReaction.emoji', 'emoji')
            .leftJoinAndSelect('roleReaction.message', 'message')
            .where('message.id = :messageId', { messageId: discordMessage.id });
    }
};
RoleReactionRepository = RoleReactionRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.RoleReaction)
], RoleReactionRepository);
exports.RoleReactionRepository = RoleReactionRepository;
//# sourceMappingURL=RoleReaction.js.map