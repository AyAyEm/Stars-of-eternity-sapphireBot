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
const discord_js_1 = require("discord.js");
const Constants_1 = require("@utils/Constants");
const async_1 = __importDefault(require("async"));
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
default_1 = __decorate([
    decorators_1.ApplyOptions({ event: 'warframeNewInvasions' })
], default_1);
exports.default = default_1;
