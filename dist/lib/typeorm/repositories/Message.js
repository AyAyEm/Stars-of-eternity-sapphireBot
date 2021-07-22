"use strict";
var MessageRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const Channel_1 = require("./Channel");
const _models_1 = require("../models");
let MessageRepository = MessageRepository_1 = class MessageRepository extends _structures_1.BaseRepository {
    async findOrInsert(discordMessage, onlyId) {
        return typeorm_1.getConnection().transaction(async (entityManager) => {
            const messageRepo = entityManager.getCustomRepository(MessageRepository_1);
            let message = await messageRepo.find(discordMessage, onlyId);
            if (!message) {
                console.log(await this.insert(discordMessage, entityManager));
                message = await messageRepo.find(discordMessage, onlyId);
            }
            return message;
        });
    }
    async insert(discordMessage, manager) {
        const channelRepo = manager
            ? manager.getCustomRepository(Channel_1.ChannelRepository)
            : typeorm_1.getCustomRepository(Channel_1.ChannelRepository);
        const channel = await channelRepo.findOrInsert(discordMessage.channel, true);
        return this.createQueryBuilder('message')
            .insert()
            .values({ channel, id: discordMessage.id })
            .execute();
    }
    async find(discordMessage, onlyId) {
        if (onlyId) {
            return this.findQuery(discordMessage)
                .select('message.id')
                .getOne();
        }
        return this.findQuery(discordMessage).getOne();
    }
    findQuery(discordMessage) {
        return this.createQueryBuilder('message')
            .where('message.id = :messageId', { messageId: discordMessage.id });
    }
};
MessageRepository = MessageRepository_1 = tslib_1.__decorate([
    typeorm_1.EntityRepository(_models_1.Message)
], MessageRepository);
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=Message.js.map