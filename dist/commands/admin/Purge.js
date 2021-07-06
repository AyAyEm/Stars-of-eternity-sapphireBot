"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityCommand {
    async run(msg, args) {
        const ammount = await args.pick('number');
        if (ammount >= 100) {
            msg.replyTranslated('commands/Purge:exceededLimit');
        }
        else {
            msg.channel.bulkDelete(Number(ammount) + 1)
                .catch((err) => msg.channel.sendTranslated('commands/Purge:error', [{ err: err.message }]));
        }
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        preconditions: ['OwnerOnly'],
        requiredArgs: ['number'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Purge.js.map