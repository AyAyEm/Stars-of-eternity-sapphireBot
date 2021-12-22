"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const plugin_i18next_1 = require("@sapphire/plugin-i18next");
const plugin_subcommands_1 = require("@sapphire/plugin-subcommands");
const decorators_1 = require("@sapphire/decorators");
const typegoose_1 = require("@typegoose/typegoose");
const _lib_1 = require("../../lib");
const _utils_1 = require("../../lib/utils");
const CaseInsensitiveMap_1 = require("../../lib/structures/CaseInsensitiveMap");
const _schemas_1 = require("../../lib/mongodb/schemas");
let default_1 = class extends plugin_subcommands_1.SubCommandPluginCommand {
    async possibleItemsEmbed(target) {
        return new _lib_1.EternityMessageEmbed()
            .addFields({
            name: await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:commonResources'),
            value: _utils_1.itemNames.commonItems.join(' | '),
            inline: false,
        }, {
            name: await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:uncommonResources'),
            value: _utils_1.itemNames.uncommonItems.join(' | '),
            inline: false,
        }, {
            name: await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:rareResources'),
            value: _utils_1.itemNames.rareItems.join(' | '),
            inline: false,
        }, {
            name: await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:weapons'),
            value: _utils_1.itemNames.weapons.join(' | '),
            inline: false,
        }, {
            name: await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:bestItems'),
            value: _utils_1.itemNames.goodOnes.join(' | '),
            inline: false,
        }, {
            name: await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:factionItems'),
            value: _utils_1.itemNames.faction.join(' | '),
            inline: false,
        }, {
            name: await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:others'),
            value: _utils_1.itemNames.others.join(' | '),
            inline: false,
        })
            .setTitle(await (0, plugin_i18next_1.resolveKey)(target, 'commands/invasion:listItems:title'));
    }
    itemsDict = new CaseInsensitiveMap_1.CaseInsensitiveMap(_utils_1.itemNames.all.map((item) => ([item.toLowerCase(), { name: item }])));
    async items(msg, args) {
        if (args.getFlags('list', 'l')) {
            const { items } = (await (0, typegoose_1.getModelForClass)(_schemas_1.InvasionTracker).aggregate([
                { $match: { channel: msg.channel.id } },
                {
                    $lookup: {
                        from: 'items',
                        localField: 'items',
                        foreignField: '_id',
                        as: 'items',
                    },
                },
                { $project: { 'items.name': 1, _id: 0 } },
            ]))[0];
            if (items.length === 0) {
                await (0, plugin_i18next_1.replyLocalized)(msg, 'commands/invasion:items:notFound');
            }
            else {
                await (0, plugin_i18next_1.replyLocalized)(msg, {
                    keys: 'commands/invasion:items:found',
                    formatOptions: { items: items.map(({ name }) => name) },
                });
            }
        }
        else {
            await msg.channel.send({ embeds: [await this.possibleItemsEmbed(msg)] });
        }
    }
    async disable(msg) {
        return this.setEnabled(msg, false);
    }
    async enable(msg) {
        return this.setEnabled(msg, true);
    }
    async setEnabled(msg, value) {
        const result = await (0, typegoose_1.getModelForClass)(_schemas_1.InvasionTracker).updateOne({ channel: msg.channel.id }, { $set: { enabled: value } }, { upsert: true, new: true });
        const action = value ? 'enable' : 'disable';
        let reply;
        if (result.modifiedCount === 0 && result.upsertedCount === 0) {
            reply = await (0, plugin_i18next_1.replyLocalized)(msg, `commands/invasion:${action}:already${(0, lodash_1.capitalize)(action)}d`);
        }
        else {
            reply = await (0, plugin_i18next_1.replyLocalized)(msg, `commands/invasion:${action}:success`);
        }
        setTimeout(() => reply.delete(), 10000);
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
        const ItemsModel = (0, typegoose_1.getModelForClass)(_schemas_1.Item);
        await ItemsModel.bulkWrite(toUpdateItems.map((itemName) => ({
            updateOne: {
                filter: { name: itemName },
                update: {},
                upsert: true,
            },
        })));
        const items = (await ItemsModel
            .find({ name: { $in: toUpdateItems } }, { _id: 1, name: 0 })
            .exec()).map(({ _id }) => _id);
        const result = await (0, typegoose_1.getModelForClass)(_schemas_1.InvasionTracker).updateOne({ channel: msg.channel.id }, {
            ...(action === 'add'
                ? { $addToSet: { items: { $each: items } } }
                : { $pullAll: { items } }),
            $setOnInsert: { enabled: true },
        }, { upsert: true, new: true });
        if (result.modifiedCount === 0 && result.upsertedCount === 0) {
            const actionVerb = action === 'add' ? 'Added' : 'Deleted';
            (0, plugin_i18next_1.replyLocalized)(msg, {
                keys: `commands/invasion:${action}:already${actionVerb}${all ? 'All' : ''}`,
                formatOptions: { items: toUpdateItems },
            });
            return;
        }
        else {
            (0, plugin_i18next_1.replyLocalized)(msg, {
                keys: `commands/invasion:${action}:success${all ? 'All' : ''}`,
                formatOptions: { items: toUpdateItems },
            });
        }
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        preconditions: ['GuildOnly'],
        subCommands: [
            'items',
            'disable',
            'enable',
            // {
            //   name: 'add',
            //   requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
            // },
            'add',
            // {
            //   name: 'delete',
            //   aliases: ['remove'],
            //   requiredArgs: [{ name: 'warframeItem', orFlags: ['all'] }],
            // },
            'delete',
            { input: 'remove', output: 'delete' },
        ],
        flags: ['all', 'l', 'list'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Invasion.js.map