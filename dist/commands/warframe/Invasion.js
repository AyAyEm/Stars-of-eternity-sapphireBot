"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const lodash_1 = require("lodash");
const decorators_1 = require("@sapphire/decorators");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../lib/utils");
const _lib_1 = require("../../lib");
const CaseInsensitiveMap_1 = require("../../lib/structures/CaseInsensitiveMap");
const typeorm_2 = require("../../lib/typeorm");
let default_1 = class extends _lib_1.EternityCommandWSC {
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
    itemsDict = new CaseInsensitiveMap_1.CaseInsensitiveMap(utils_1.itemNames.all.map((item) => ([item.toLowerCase(), { name: item }])));
    get invasionTrackerRepo() {
        return typeorm_1.getCustomRepository(typeorm_2.InvasionTrackerRepository);
    }
    get itemRepo() {
        return typeorm_1.getCustomRepository(typeorm_2.ItemRepository);
    }
    async items(msg, args) {
        if (args.getFlags('list', 'l')) {
            const items = await this.invasionTrackerRepo.findItemsByChannel(msg.channel);
            if (items.length === 0) {
                await msg.replyTranslated('commands/invasion:items:notFound');
            }
            else {
                await msg.replyTranslated('commands/invasion:items:found', [{ items: items.map(({ name }) => name) }]);
            }
        }
        else {
            await msg.channel.send(this.possibleItemsEmbed);
        }
    }
    async disable(msg) {
        return this.setEnabled(msg, false);
    }
    async enable(msg) {
        return this.setEnabled(msg, true);
    }
    async setEnabled(msg, value) {
        const invasionTracker = await this.invasionTrackerRepo.findOrInsert(msg.channel);
        const action = value ? 'enable' : 'disable';
        if (invasionTracker.enabled === value) {
            await msg.replyTranslated(`commands/invasion:${action}:already${lodash_1.capitalize(action)}d`);
            return;
        }
        await this.invasionTrackerRepo.createQueryBuilder()
            .update(typeorm_2.InvasionTracker)
            .set({ enabled: value })
            .where('invasion_tracker.id = :invasionTrackerId', { invasionTrackerId: invasionTracker.id })
            .execute();
        const reply = await msg.replyTranslated(`commands/invasion:${action}:success`);
        reply.delete({ timeout: 10000 });
    }
    async add(msg, args) {
        return this.updateItems('add', msg, args);
    }
    async delete(msg, args) {
        return this.updateItems('delete', msg, args);
    }
    async updateItems(action, msg, args) {
        const all = args.getFlags('all');
        const toUpdateItems = all ? [...this.itemsDict.keys()] : await args.repeat('warframeItem');
        const storedItems = await this.invasionTrackerRepo.findItemsByChannel(msg.channel);
        const storedItemsNames = new Map(storedItems.map((warframeItem) => ([warframeItem.name, warframeItem])));
        const parsedToUpdateItems = toUpdateItems
            .map((item) => (this.itemsDict.get(item)))
            .filter((item) => {
            const hasItem = storedItemsNames.has(item.name);
            return action === 'add' ? !hasItem : hasItem;
        });
        if (parsedToUpdateItems.length <= 0) {
            msg.replyTranslated(`commands/invasion:${action}:already${action === 'add' ? 'Added' : 'Deleted'}${all ? 'All' : ''}`, [{ items: toUpdateItems }]);
            return;
        }
        const invasionTracker = await this.invasionTrackerRepo.findOrInsert(msg.channel, true);
        await Promise.all(parsedToUpdateItems.map(async (warframeItem) => {
            const item = await this.itemRepo.findOrInsert(warframeItem);
            const query = typeorm_1.getConnection()
                .createQueryBuilder()
                .relation(typeorm_2.InvasionTracker, 'items')
                .of(invasionTracker);
            await (action === 'add' ? query.add(item) : query.remove(item));
        }));
        msg.replyTranslated(`commands/invasion:${action}:success${all ? 'All' : ''}`, [{ items: [...parsedToUpdateItems].map(({ name }) => name) }]);
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        preconditions: ['GuildOnly'],
        subCommands: [
            { name: 'items', flags: ['list', 'l'] },
            'disable',
            'enable',
            {
                name: 'add',
                requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
            },
            {
                name: 'delete',
                aliases: ['remove'],
                requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
            },
        ],
        strategyOptions: {
            flags: ['all'],
        },
        caseInsensitive: true,
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Invasion.js.map