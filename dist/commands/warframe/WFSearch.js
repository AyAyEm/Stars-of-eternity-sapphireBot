"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const async_1 = tslib_1.__importDefault(require("async"));
const fuzzyset_js_1 = tslib_1.__importDefault(require("fuzzyset.js"));
const decorators_1 = require("@sapphire/decorators");
const discord_js_1 = require("discord.js");
const itemSearch_1 = require("../../lib/embeds/warframe/itemSearch");
const _utils_1 = require("../../lib/utils");
const _lib_1 = require("../../lib");
let default_1 = class extends _lib_1.EternityCommand {
    items = this.client.warframe.items;
    fuzzySet;
    categoryDictionary = new _utils_1.MultiEntryMap([
        [['Arch-Gun', 'Arch-Melee', 'Melee', 'Primary', 'Secondary'], itemSearch_1.WeaponPagedEmbed],
        [['Archwing', 'Warframes'], itemSearch_1.WarframePagedEmbed],
        [['Mods'], itemSearch_1.ModPagedEmbed],
    ]);
    async onLoad() {
        super.onLoad();
        const uniqueNames = await this.items.getUniqueNames();
        this.fuzzySet = fuzzyset_js_1.default([...uniqueNames.keys()]);
    }
    async run(msg, args) {
        const { channel } = msg;
        const { fuzzySet } = this;
        const itemName = await args.rest('string');
        const matchedItems = await async_1.default.map(fuzzySet.get(itemName).slice(0, 3), async ([score, name]) => {
            const item = await this.items.get(name);
            return { item, score };
        });
        let warframeItem = matchedItems[0].item;
        let noMatchMessage = null;
        if ((matchedItems[0].score || 0) < 0.7) {
            const matchItemsString = matchedItems
                .map(({ item }, index) => `${_utils_1.numberEmojis[index + 1]} ${item.name} ${item.category}`);
            const noMatchEmbed = new discord_js_1.MessageEmbed()
                .setTitle(i18next_1.default.t('commands/WFSearch:itemNotFound'))
                .setDescription(i18next_1.default.t('commands/WFSearch:selectOneOf', { items: matchItemsString.join('\n\n') }));
            noMatchMessage = (await channel.send(noMatchEmbed));
            const collector = noMatchMessage
                .createReactionCollector(() => true, { time: 15000 });
            const reactions = noMatchMessage.multiReact([..._utils_1.numberEmojis.slice(1, 4), '❌']);
            let collectedReaction = false;
            collector.on('collect', async (reaction) => {
                if (reaction.emoji.name === '❌') {
                    collector.stop('User decided to stop');
                }
                else if (!collectedReaction) {
                    collectedReaction = true;
                    await reactions.stopReactions();
                    const index = _utils_1.numberEmojis.indexOf(reaction.emoji.name);
                    reaction.message.reactions.removeAll();
                    collector.stop('Reaction defined');
                    warframeItem = matchedItems[index - 1].item;
                }
            });
            collector.on('end', (_, endingReason) => {
                if (endingReason === 'time' || endingReason === 'User decided to stop') {
                    msg.delete();
                    collector.message.delete({ reason: endingReason });
                }
            });
        }
        const PagedEmbed = this.categoryDictionary.get(warframeItem.category);
        if (PagedEmbed) {
            const context = { client: this.client, item: warframeItem, channel: msg.channel };
            const filter = (_, user) => user.id === msg.author.id;
            const pagedEmbed = new PagedEmbed(context, { filter });
            pagedEmbed.send(noMatchMessage);
        }
        else {
            msg.replyTranslated('commands/WFSearch:invalidQuery');
        }
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        aliases: ['wfs'],
        preconditions: ['GuildOnly'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=WFSearch.js.map