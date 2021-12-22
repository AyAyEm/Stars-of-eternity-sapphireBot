"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const plugin_i18next_1 = require("@sapphire/plugin-i18next");
const _lib_1 = require("../../lib");
let default_1 = class extends _lib_1.EternityCommand {
    async messageRun(msg, args) {
        const ammount = await args.pick('number');
        if (ammount >= 100) {
            (0, plugin_i18next_1.replyLocalized)(msg, 'commands/Purge:exceededLimit');
        }
        else {
            if (msg.channel.type === 'DM')
                return;
            msg.channel.bulkDelete(Number(ammount) + 1)
                .catch((err) => (0, plugin_i18next_1.sendLocalized)(msg.channel, { keys: 'commands/Purge:error', formatOptions: { err: err.message } }));
        }
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        preconditions: ['OwnerOnly'],
        requiredArgs: ['number'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Purge.js.map