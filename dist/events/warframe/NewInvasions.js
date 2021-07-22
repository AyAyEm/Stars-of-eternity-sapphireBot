"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const decorators_1 = require("@sapphire/decorators");
const typeorm_1 = require("typeorm");
const _lib_1 = require("../../lib");
const structures_1 = require("../../lib/structures");
const _repositories_1 = require("../../lib/typeorm/repositories");
const Constants_1 = require("../../lib/utils/Constants");
let default_1 = class extends _lib_1.EternityEvent {
    async run(invasions) {
        const InvasionTrackerRepo = typeorm_1.getCustomRepository(_repositories_1.InvasionTrackerRepository);
        const invasionTrackers = await InvasionTrackerRepo.createQueryBuilder('invasionTracker')
            .where('invasionTracker.enabled = :enabled', { enabled: true })
            .stream();
        const handler = (data) => (async () => {
            const invasionTracker = await InvasionTrackerRepo
                .createQueryBuilder('invasionTracker')
                .leftJoinAndSelect('invasionTracker.items', 'items')
                .leftJoinAndSelect('invasionTracker.channel', 'channel')
                .where('invasionTracker.id = :invasionTrackerId', { invasionTrackerId: data.invasionTracker_id })
                .getOne();
            if (invasionTracker.items.length > 0) {
                const itemNames = new structures_1.CaseInsensitiveSet(invasionTracker.items.map(({ name }) => name));
                const channelId = invasionTracker.channel.id;
                await Promise.all(invasions
                    .filter(({ rewardTypes }) => rewardTypes.find((itemName) => itemNames.has(itemName)))
                    .map(async (invasion) => {
                    const items = invasion.rewardTypes.filter((itemName) => itemNames.has(itemName));
                    const embeds = this.makeEmbeds(invasion, items);
                    const discordChannel = await this.client.channels.fetch(channelId);
                    await Promise.all(embeds.map((embed) => discordChannel.send(embed)));
                }));
            }
        })().catch((e) => this.client.console.error(e));
        invasionTrackers.on('data', handler);
    }
    makeEmbeds(invasion, matchedItems) {
        function embedMaker([reward, ...factions]) {
            const { factionsStyle } = Constants_1.Warframe;
            return new discord_js_1.MessageEmbed()
                .setTitle(`${reward.itemString}`)
                .setThumbnail(reward.thumbnail)
                .setTimestamp()
                .setColor(factionsStyle.get(factions[0])?.color || 'white')
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
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: 'warframeNewInvasions' })
], default_1);
exports.default = default_1;
//# sourceMappingURL=NewInvasions.js.map