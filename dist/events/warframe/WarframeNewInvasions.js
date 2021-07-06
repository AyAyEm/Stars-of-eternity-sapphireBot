"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
const Constants_1 = require("../../lib/utils/Constants");
const async_1 = tslib_1.__importDefault(require("async"));
let default_1 = class extends _lib_1.EternityEvent {
    async run(invasions) {
        this.client.provider.models.Guilds.find({}).cursor()
            .on('data', async ({ channels }) => {
            if (!channels)
                return;
            channels.forEach(async ({ invasionItems }, channelId) => {
                if (!invasionItems?.enabled && !invasionItems?.items?.length)
                    return;
                await async_1.default.forEach(invasions, async (invasion) => {
                    const matchedItems = invasion.rewardTypes
                        .filter((rewardItem) => invasionItems.items.includes(rewardItem));
                    if (matchedItems.length === 0)
                        return;
                    const embeds = this.makeEmbeds(invasion, matchedItems);
                    const discordChannel = await this.client.channels.fetch(channelId);
                    embeds.forEach((embed) => discordChannel.send(embed));
                });
            });
        });
    }
    makeEmbeds(invasion, matchedItems) {
        function embedMaker([reward, defendingFaction, attackingFaction]) {
            const { factionsStyle } = Constants_1.Warframe;
            return new discord_js_1.MessageEmbed()
                .setTitle(`${reward.itemString}`)
                .setThumbnail(reward.thumbnail)
                .setTimestamp()
                .setColor(factionsStyle.get(defendingFaction)?.color || 'white')
                .setAuthor(`${invasion.node} ${invasion.desc}`, factionsStyle.get(defendingFaction)?.tumb)
                .setFooter(`${defendingFaction} x ${attackingFaction}`, factionsStyle.get(attackingFaction)?.tumb);
        }
        const embeds = [];
        const numbOfItems = matchedItems.length;
        const { attackingFaction, defendingFaction, attackerReward, defenderReward, rewardTypes, } = invasion;
        if (attackingFaction === 'Infested') {
            embeds.push(embedMaker([defenderReward, attackingFaction, defendingFaction]));
            if (numbOfItems === 1)
                return embeds;
        }
        if (matchedItems.includes(rewardTypes[0])) {
            embeds.push(embedMaker([attackerReward, attackingFaction, defendingFaction]));
        }
        if (matchedItems.includes(rewardTypes[1])) {
            embeds.push(embedMaker([defenderReward, defendingFaction, attackingFaction]));
        }
        return embeds;
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: 'warframeNewInvasions' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=WarframeNewInvasions.js.map