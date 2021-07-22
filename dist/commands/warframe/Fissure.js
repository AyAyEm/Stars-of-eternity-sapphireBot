"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const decorators_1 = require("@sapphire/decorators");
const typeorm_1 = require("typeorm");
const _lib_1 = require("../../lib");
const _repositories_1 = require("../../lib/typeorm/repositories");
const _utils_1 = require("../../lib/utils");
let default_1 = class extends _lib_1.EternityCommandWSC {
    get fissureTrackerRepo() {
        return typeorm_1.getCustomRepository(_repositories_1.FissureTrackerRepository);
    }
    async setEnabled(msg, value) {
        const { fissureTrackerRepo } = this;
        const fissureTrackers = await fissureTrackerRepo.findOrInsertAll(msg.channel);
        const toUpdateTrackers = fissureTrackers.filter(({ enabled }) => (value ? !enabled : enabled));
        const action = value ? 'enable' : 'disable';
        if (toUpdateTrackers.length <= 0) {
            const reply = msg.replyTranslated(`commands/Relics:${action}:already${lodash_1.capitalize(action)}d`);
            await _utils_1.deleteMsgs([reply, msg], { timeout: 15000 });
            return;
        }
        await fissureTrackerRepo.createQueryBuilder('fissureTracker')
            .update()
            .set({ enabled: value })
            .where('fissure_tracker.id IN (:...trackerIds)', { trackerIds: toUpdateTrackers.map(({ id }) => id) })
            .execute();
        const reply = await msg.replyTranslated(`commands/Relics:${action}:success`);
        await _utils_1.deleteMsgs([reply, msg], { timeout: 15000 });
    }
    async enable(msg) {
        await this.setEnabled(msg, true);
    }
    async disable(msg) {
        await this.setEnabled(msg, false);
    }
    async reset(msg) {
        const fissureTrackers = await this.fissureTrackerRepo
            .createQueryBuilder('fissure')
            .leftJoinAndSelect('fissure.message', 'message')
            .leftJoinAndSelect('fissure.channel', 'channel')
            .where('channel.id = :channelId', { channelId: msg.channel.id })
            .getMany();
        const { fissureTrackerRepo } = this;
        if (fissureTrackers.length > 0) {
            const messagesDeletion = Promise.all(fissureTrackers.map(async (fissureTracker) => {
                const channel = await this.client.channels
                    .fetch(fissureTracker.channel.id);
                const message = await channel.messages
                    .fetch(fissureTracker.message.id).catch(() => null);
                await message?.delete().catch(() => null);
            }));
            await fissureTrackerRepo.delete(fissureTrackers);
            await messagesDeletion;
        }
        await fissureTrackerRepo.findOrInsertAll(msg.channel, true);
        await _utils_1.deleteMsgs([msg.replyTranslated('commands/Relics:reset:success'), msg], { timeout: 15000 });
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        preconditions: ['GuildOnly'],
        subCommands: ['enable', 'disable', 'reset'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Fissure.js.map