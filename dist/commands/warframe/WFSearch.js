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
const decorators_1 = require("@sapphire/decorators");
const _lib_1 = require("@lib");
const discord_js_1 = require("discord.js");
const async_1 = __importDefault(require("async"));
const fuzzyset_js_1 = __importDefault(require("fuzzyset.js"));
const itemSearch_1 = __importDefault(require("@embeds/warframe/itemSearch"));
const Constants_1 = require("@utils/Constants");
function isAuthorFilter(author) {
    return function checkIfUserIsAuthor(_, user) {
        return author.id === user.id;
    };
}
let default_1 = class extends _lib_1.EternityCommand {
    items = this.client.warframe.items;
    itemNames = Promise.resolve(this.items.getUniqueNameDict()).then(Object.keys);
    fuzzySet = this.itemNames.then(fuzzyset_js_1.default);
    async run(msg, args) {
        const itemName = await args.rest('string');
        const { channel, author } = msg;
        const fuzzySet = await this.fuzzySet;
        const matchedItems = await async_1.default.map(fuzzySet.get(itemName).slice(0, 3), async ([score, name]) => {
            const item = await this.items.get(name);
            return { item, score };
        });
        if ((matchedItems[0].score || 0) < 0.7) {
            const matchItemsString = matchedItems
                .map(({ item }, index) => `${Constants_1.numberEmojis[index + 1]} ${item.name} ${item.category}`);
            const noMatchEmbed = new discord_js_1.MessageEmbed()
                .setTitle('Item não encontrado')
                .setDescription(`Selecione um dos seguintes items:\n\n${matchItemsString.join('\n\n')}`);
            const noMatchMessage = (await channel.send(noMatchEmbed));
            const collector = noMatchMessage
                .createReactionCollector(isAuthorFilter(author), { time: 15000 });
            const reactions = noMatchMessage.multiReact([...Constants_1.numberEmojis.slice(1, 4), '❌']);
            collector.on('collect', async (reaction) => {
                if (reaction.emoji.name === '❌') {
                    collector.stop('User decided to stop');
                    return;
                }
                reactions.stopReactions();
                await reactions;
                const index = Constants_1.numberEmojis.indexOf(reaction.emoji.name);
                reaction.message.reactions.removeAll();
                collector.stop('Reaction defined');
                this.sendItemMessage(matchedItems[index - 1].item, msg, noMatchMessage);
            });
            collector.on('end', (_, endingReason) => {
                if (endingReason === 'time' || endingReason === 'User decided to stop') {
                    // msg.delete({ endingReason });
                    collector.message.delete({ reason: endingReason });
                }
            });
        }
        else {
            this.sendItemMessage(matchedItems[0].item, msg);
        }
    }
    async sendItemMessage(item, msg, previousSentMessage) {
        const { author } = msg;
        const embedsMap = itemSearch_1.default(item);
        if (!embedsMap) {
            msg.sendTranslated('commands/WFSearch:invalidQuery', [{ item }]);
            return;
        }
        const sentMessage = previousSentMessage
            ? await previousSentMessage.edit(undefined, [...(embedsMap?.values() || [])][0])
            : await msg.channel.send([...(embedsMap?.values() || [])][0]);
        const timerOptions = { time: 0, idle: 240000 };
        const collector = sentMessage
            .createReactionCollector(isAuthorFilter(author), { ...timerOptions, dispose: true });
        collector.on('collect', (reaction) => {
            if (reaction.emoji.name === '❌') {
                collector.stop('User decided to end it');
                return;
            }
            sentMessage.edit(undefined, embedsMap?.get(reaction.emoji.name));
            collector.resetTimer(timerOptions);
            reaction.users.remove(author);
        });
        collector.on('end', () => {
            // const reason = 'Command ended';
            // msg.delete({ reason });
            // collector.message.delete({ reason });
            collector.message.reactions.removeAll();
        });
        sentMessage.multiReact([...(embedsMap?.keys() || []), '❌']);
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({
        aliases: ['wfs'],
        preconditions: ['GuildOnly'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=WFSearch.js.map