"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const eternity_1 = require("../../lib/eternity");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityEvent {
    async run(channel) {
        eternity_1.toJoinChannel(channel);
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: 'memberJoinedChannel', enabled: false })
], default_1);
exports.default = default_1;
//# sourceMappingURL=MemberJoinedChannel.js.map