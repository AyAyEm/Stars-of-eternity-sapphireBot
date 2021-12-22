"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
const typegoose_1 = require("@typegoose/typegoose");
const structures_1 = require("../../lib/structures");
const _schemas_1 = require("../../lib/mongodb/schemas");
const _utils_1 = require("../../lib/utils");
let default_1 = class extends framework_1.Listener {
    async run(invasions) {
        await (0, typegoose_1.getModelForClass)(_schemas_1.InvasionTracker)
            .find({ enabled: true })
            .populate('items')
            .cursor()
            .eachAsync(async (invasionTracker) => {
            if (invasionTracker.items.length > 0) {
                const itemNames = new structures_1.CaseInsensitiveSet(invasionTracker.items.map(({ name }) => name));
                const channelId = invasionTracker.channel;
                await Promise.all(invasions
                    .filter(({ rewardTypes }) => rewardTypes.find((itemName) => itemNames.has(itemName)))
                    .map(async (invasion) => {
                    const items = invasion.rewardTypes.filter((itemName) => itemNames.has(itemName));
                    const embeds = this.makeEmbeds(invasion, items);
                    const discordChannel = await this.container.client.channels.fetch(channelId);
                    await discordChannel.send({ embeds: embeds });
                }));
            }
        }).catch((e) => this.container.client.logger.error(e));
    }
    makeEmbeds(invasion, matchedItems) {
        function embedMaker([reward, ...factions]) {
            const { factionsStyle } = _utils_1.Warframe;
            return new discord_js_1.MessageEmbed()
                .setTitle(`${reward.itemString}`)
                .setThumbnail(reward.thumbnail)
                .setTimestamp()
                .setColor(factionsStyle.get(factions[0])?.color || 'WHITE')
                .setAuthor(`${invasion.node} ${invasion.desc}`, factionsStyle.get(factions[0])?.tumb)
                .setFooter(`${factions[0]} x ${factions[1]}`, factionsStyle.get(factions[1])?.tumb);
        }
        const embeds = new Set();
        const { attackingFaction, defendingFaction, attackerReward, defenderReward, rewardTypes, } = invasion;
        if (attackingFaction === 'Infested') {
            embeds.add(embedMaker([defenderReward, attackingFaction, defendingFaction]));
            if (matchedItems.length === 1)
                return [...embeds];
        }
        if (matchedItems.includes(rewardTypes[0])) {
            embeds.add(embedMaker([attackerReward, attackingFaction, defendingFaction]));
        }
        if (matchedItems.includes(rewardTypes[1])) {
            embeds.add(embedMaker([defenderReward, defendingFaction, attackingFaction]));
        }
        return [...embeds];
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ event: 'warframeNewInvasions' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=NewInvasions.js.map