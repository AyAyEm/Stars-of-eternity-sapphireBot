"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _lib_1 = require("@lib");
const decorators_1 = require("@sapphire/decorators");
const fissureTracker_1 = require("@embeds/warframe/fissureTracker");
const async_1 = __importDefault(require("async"));
let default_1 = class extends _lib_1.EternityEvent {
    async run(fissures) {
        const fissuresEmbeds = fissureTracker_1.fissuresEmbed(fissures);
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
                        const oldMessage = await channel.messages.fetch(messageId)
                            .catch(() => undefinedMessage(embed, tier));
                        if (oldMessage)
                            await oldMessage.edit(embed);
                    }
                });
                await guildDocument.set(messagesPath, messages);
            });
        });
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({ event: 'warframeNewActiveFissures' })
], default_1);
exports.default = default_1;
