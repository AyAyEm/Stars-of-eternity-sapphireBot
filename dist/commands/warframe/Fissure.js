"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const async_1 = (0, tslib_1.__importDefault)(require("async"));
const lodash_1 = require("lodash");
const decorators_1 = require("@sapphire/decorators");
const plugin_i18next_1 = require("@sapphire/plugin-i18next");
const plugin_subcommands_1 = require("@sapphire/plugin-subcommands");
const typegoose_1 = require("@typegoose/typegoose");
const _utils_1 = require("../../lib/utils");
const _schemas_1 = require("../../lib/mongodb/schemas");
const placeHolder_1 = require("../../lib/utils/placeHolder");
let default_1 = class extends plugin_subcommands_1.SubCommandPluginCommand {
    async setEnabled(msg, value) {
        const result = await (0, typegoose_1.getModelForClass)(_schemas_1.FissureTracker).updateOne({ enabled: !value, channel: msg.channel.id }, { $set: { enabled: value } }, { upsert: true });
        const action = value ? 'enable' : 'disable';
        let reply;
        if (result.modifiedCount === 0 && result.upsertedCount === 0) {
            reply = await (0, plugin_i18next_1.replyLocalized)(msg, `commands/Relics:${action}:already${(0, lodash_1.capitalize)(action)}d`);
        }
        else {
            reply = await (0, plugin_i18next_1.replyLocalized)(msg, `commands/Relics:${action}:success`);
        }
        await (0, _utils_1.wait)(15000);
        await (0, _utils_1.deleteMsgs)([reply, msg]);
    }
    async enable(msg) {
        await this.setEnabled(msg, true);
    }
    async disable(msg) {
        await this.setEnabled(msg, false);
    }
    async reset(msg) {
        const fissureTracker = await (0, typegoose_1.getModelForClass)(_schemas_1.FissureTracker)
            .findOneAndUpdate({ channel: msg.channel.id }, { $set: { enabled: true } }, { upsert: true, new: true });
        const oldMessages = fissureTracker.messages;
        const messagesDeletion = Promise.all(oldMessages.map((id) => (msg.channel.messages.delete(id).catch(() => null))));
        const messages = await async_1.default.mapSeries(Array(5), async () => {
            const message = await msg.channel.send({ embeds: [(0, placeHolder_1.placeHolder)()] });
            return message.id;
        });
        await fissureTracker.updateOne({ $set: { messages } });
        await messagesDeletion;
        const sucessMsg = await (0, plugin_i18next_1.replyLocalized)(msg, 'commands/Relics:reset:success');
        await (0, _utils_1.wait)(15000);
        await (0, _utils_1.deleteMsgs)([sucessMsg, msg]);
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        preconditions: ['GuildOnly'],
        subCommands: ['enable', 'disable', 'reset'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Fissure.js.map