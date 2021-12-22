"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const typegoose_1 = require("@typegoose/typegoose");
const FissureTracker_1 = require("../../lib/embeds/warframe/FissureTracker");
const _schemas_1 = require("../../lib/mongodb/schemas");
let default_1 = class extends framework_1.Listener {
    async run(fissures) {
        const FissureTrackerModel = (0, typegoose_1.getModelForClass)(_schemas_1.FissureTracker);
        const fissuresEmbeds = (0, FissureTracker_1.fissuresEmbed)(fissures);
        await FissureTrackerModel
            .find({ enabled: true }, { _id: 0, messages: 1, channel: 1 })
            .cursor()
            .eachAsync(async (fissureTracker) => {
            const channelId = fissureTracker.channel;
            const channel = await this.container.client.channels.fetch(channelId);
            await Promise.all(fissureTracker.messages.map(async (messageId, tier) => {
                const embed = fissuresEmbeds.get(tier + 1);
                if (!messageId || !embed)
                    return;
                const message = await channel.messages.fetch(messageId);
                await message.edit({ embeds: [embed] });
            }).map((p) => p.catch((e) => this.container.client.logger.error(e))));
        }).catch((e) => this.container.client.logger.error(e));
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ event: 'warframeNewActiveFissures' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=NewActiveFissures.js.map