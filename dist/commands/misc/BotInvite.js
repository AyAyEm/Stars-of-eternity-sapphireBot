"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const _lib_1 = require("../../lib");
const _utils_1 = require("../../lib/utils");
let default_1 = class extends _lib_1.EternityCommand {
    async messageRun(msg) {
        const invite = `https://discord.com/oauth2/authorize?client_id=${this.container.client.id}&scope=bot`;
        (0, _utils_1.sendAndDelete)(msg.channel, { content: invite });
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        preconditions: ['OwnerOnly'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=BotInvite.js.map