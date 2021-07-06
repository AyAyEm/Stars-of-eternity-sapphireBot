"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
const FissureTracker_1 = require("../../lib/embeds/warframe/FissureTracker");
const async_1 = tslib_1.__importDefault(require("async"));
let default_1 = class extends _lib_1.EternityEvent {
    async run(fissures) {
        const fissuresEmbeds = FissureTracker_1.fissuresEmbed(fissures);
        this.client.provider.models.Guilds.find({}).cursor()
            .on('data', async ({ channels, id: guildId }) => {
            if (!channels)
                return;
            const guildDocument = await new this.client.provider.Guilds(guildId).load;
            channels.forEach(async ({ relicTracker }, channelId) => {
                if (!relicTracker || !relicTracker.enabled)
                    return;
                const messagesPath = `channels.${channelId}.relicTracker.messages`;
                const messages = await guildDocument.get(messagesPath, Map);
                const channel = await this.client.channels.fetch(channelId);
                const undefinedMessage = async (embed, tier) => {
                    const sentMessage = await channel.send(embed);
                    messages.set(tier, sentMessage.id);
                };
                await async_1.default.eachOfSeries([...fissuresEmbeds.entries()], async ([tier, embed]) => {
                    if (!messages.has(tier)) {
                        await undefinedMessage(embed, tier);
                    }
                    else {
                        const messageId = messages.get(tier);
                        channel.messages.fetch(messageId)
                            .then((oldMessage) => {
                            if (!oldMessage) {
                                oldMessage.edit(embed);
                            }
                            else {
                                undefinedMessage(embed, tier);
                            }
                        })
                            .catch(() => undefinedMessage(embed, tier));
                    }
                });
                await guildDocument.set(messagesPath, messages);
            });
        });
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: 'warframeNewActiveFissures' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=WarframeNewActiveFissures.js.map