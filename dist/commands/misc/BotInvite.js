"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const _lib_1 = require("../../lib");
let default_1 = class extends _lib_1.EternityCommand {
    async run(msg) {
        msg.channel.sendAndDelete(this.client.invite, { timeout: 10000 });
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        preconditions: ['OwnerOnly'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=BotInvite.js.map