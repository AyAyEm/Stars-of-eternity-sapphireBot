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
const i18next_1 = __importDefault(require("i18next"));
const _lib_1 = require("@lib");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
const utils_1 = require("@lib/utils");
let default_1 = class extends _lib_1.EternityCommandWSC {
    async document(guildId) {
        return new this.client.provider.Guilds(guildId);
    }
    possibleItemsEmbed = new _lib_1.EternityMessageEmbed()
        .addFields({
        name: i18next_1.default.t('commands/invasion:listItems:commonResources'),
        value: utils_1.itemNames.commonItems.join(' | '),
        inline: false,
    }, {
        name: i18next_1.default.t('commands/invasion:listItems:uncommonResources'),
        value: utils_1.itemNames.uncommonItems.join(' | '),
        inline: false,
    }, {
        name: i18next_1.default.t('commands/invasion:listItems:rareResources'),
        value: utils_1.itemNames.rareItems.join(' | '),
        inline: false,
    }, {
        name: i18next_1.default.t('commands/invasion:listItems:weapons'),
        value: utils_1.itemNames.weapons.join(' | '),
        inline: false,
    }, {
        name: i18next_1.default.t('commands/invasion:listItems:bestItems'),
        value: utils_1.itemNames.goodOnes.join(' | '),
        inline: false,
    }, {
        name: i18next_1.default.t('commands/invasion:listItems:factionItems'),
        value: utils_1.itemNames.faction.join(' | '),
        inline: false,
    }, {
        name: i18next_1.default.t('commands/invasion:listItems:others'),
        value: utils_1.itemNames.others.join(' | '),
        inline: false,
    })
        .setTitle(i18next_1.default.t('commands/invasion:listItems:title'));
    items = {
        dictionary: new Map(utils_1.itemNames.all.map((item) => [item.toLowerCase(), item])),
    };
    subCommands = {
        items: async (msg) => {
            const document = await this.document(msg.guild.id);
            const items = await document.get(`channels.${msg.channel.id}.invasionItems.items`, []);
            if (items.length === 0) {
                throw new framework_1.UserError('commands/invasion:items:notFound', 'No invasion items were found');
            }
            msg.sendTranslated('commands/invasion:items:found', [{ items }]);
        },
        listItems: async (msg) => {
            msg.channel.send(this.possibleItemsEmbed);
        },
        disable: async (msg) => {
            const document = await this.document(msg.guild.id);
            const invasionItems = await document.get(`channels.${msg.channel.id}.invasionItems`, {});
            if (!invasionItems.enabled) {
                const errorMessage = 'Invasions are already disabled in this channel';
                throw new framework_1.UserError('commands/invasion:disable:alreadyDisabled', errorMessage);
            }
            else {
                await document.set(`channels.${msg.channel.id}.invasionItems.enabled`, false);
                (await msg.replyTranslated('commands/invasion:disable:success')).delete({ timeout: 10000 });
            }
        },
        enable: async (msg) => {
            const document = await this.document(msg.guild.id);
            const invasionItems = await document.get(`channels.${msg.channel.id}.invasionItems`, {});
            if (invasionItems.enabled) {
                const errorMessage = 'Invasions are already disabled in this channel';
                throw new framework_1.UserError('commands/invasion:enable:alreadyEnabled', errorMessage);
            }
            else {
                await document.set(`channels.${msg.channel.id}.invasionItems.enabled`, true);
                (await msg.replyTranslated('commands/invasion:enable:success')).delete({ timeout: 10000 });
            }
        },
        add: async (msg, args) => {
            const document = await this.document(msg.guild.id);
            const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
            const invasionItems = await document.get(invasionItemsPath);
            if (!invasionItems) {
                const defaultMessage = 'This channel was not configured for invasions!';
                throw new framework_1.UserError('commands/invasion:add:channelNotConfigured', defaultMessage);
            }
            else {
                const newItems = await args.repeat('warframeItem');
                const parsedNewItems = newItems.map((item) => this.items.dictionary.get(item));
                const itemsData = new Set([...invasionItems.items, ...parsedNewItems]);
                await document.set(`${invasionItemsPath}.items`, [...itemsData.values()]);
                msg.replyTranslated('commands/invasion:add:success', [{ items: newItems }]);
            }
        },
        addAll: async (msg) => {
            const document = await this.document(msg.guild.id);
            const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
            await document.set(`${invasionItemsPath}.items`, utils_1.itemNames.all);
            msg.replyTranslated('commands/invasion:addAll:success');
        },
        delete: async (msg, args) => {
            const document = await this.document(msg.guild.id);
            const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
            const invasionItems = await document.get(invasionItemsPath);
            if (!invasionItems) {
                const defaultMessage = 'This channel was not configured for invasions!';
                throw new framework_1.UserError('commands/invasion:delete:channelNotConfigured', defaultMessage);
            }
            else {
                const newItems = await args.repeat('warframeItem');
                const parsedNewItems = newItems.map((item) => this.items.dictionary.get(item));
                const itemsData = invasionItems.items.filter((item) => parsedNewItems.includes(item));
                await document.set(`${invasionItemsPath}.items`, [...itemsData.values()]);
                msg.replyTranslated('commands/invasion:delete:success', [{ items: newItems }]);
            }
        },
        deleteAll: async (msg) => {
            const document = await this.document(msg.guild.id);
            const invasionItemsPath = `channels.${msg.channel.id}.invasionItems`;
            await document.set(`${invasionItemsPath}.items`, []);
            msg.replyTranslated('commands/invasion:deleteAll:success');
        },
    };
};
default_1 = __decorate([
    decorators_1.ApplyOptions({
        preconditions: ['GuildOnly'],
        requiredArgs: [
            ['add', ['warframeItem']],
            ['delete', ['warframeItem']],
        ],
        subAliases: [
            ['listItems', ['li']],
        ],
        caseInsensitive: true,
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Invasion.js.map