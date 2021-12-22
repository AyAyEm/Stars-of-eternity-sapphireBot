"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const eternity_1 = require("../../lib/eternity");
let default_1 = class extends framework_1.Listener {
    async run(channel) {
        (0, eternity_1.toJoinChannel)(channel);
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ event: 'memberLeftChannel', enabled: false })
], default_1);
exports.default = default_1;
//# sourceMappingURL=MemberLeftChannel.js.map