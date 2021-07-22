"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityEvent {
    async run(messageReaction, user) { }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: framework_1.Events.MessageReactionRemove })
], default_1);
exports.default = default_1;
//# sourceMappingURL=MessageReactionAdd.js.map