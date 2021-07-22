"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const typeorm_1 = require("typeorm");
const _lib_1 = require("../../lib");
const FissureTracker_1 = require("../../lib/embeds/warframe/FissureTracker");
const _repositories_1 = require("../../lib/typeorm/repositories");
let default_1 = class extends _lib_1.EternityEvent {
    async run(fissures) {
        const fissureTrackerRepo = typeorm_1.getCustomRepository(_repositories_1.FissureTrackerRepository);
        const fissureTrackers = await fissureTrackerRepo.createQueryBuilder('fissureTracker')
            .where('fissureTracker.enabled = :enabled', { enabled: true })
            .stream();
        const fissuresEmbeds = FissureTracker_1.fissuresEmbed(fissures);
        const handler = (data) => (async () => {
            const fissureTracker = await fissureTrackerRepo.createQueryBuilder('fissureTracker')
                .leftJoinAndSelect('fissureTracker.channel', 'channel')
                .leftJoinAndSelect('fissureTracker.message', 'message')
                .where('fissureTracker.id = :fissureTrackerId', { fissureTrackerId: data.fissureTracker_id })
                .getOne();
            const embed = fissuresEmbeds.get(fissureTracker.tier);
            if (!embed)
                return;
            const channel = await this.client.channels
                .fetch(fissureTracker.channel.id);
            const message = await channel.messages.fetch(fissureTracker.message.id);
            await message.edit(embed);
        })().catch((e) => this.client.console.error(e));
        fissureTrackers.on('data', handler);
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: 'warframeNewActiveFissures' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=NewActiveFissures.js.map