"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
let default_1 = class extends _lib_1.EternityEvent {
    run(error, { message, piece }) {
        if (error instanceof _lib_1.CommandError) {
            message.channel.sendTranslated(`commands/${piece.name}:${error.identifier}`);
        }
        else if (error instanceof framework_1.UserError) {
            message.channel.sendTranslated(error.identifier);
        }
        else {
            this.client.console.error(error);
        }
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: framework_1.Events.CommandError })
], default_1);
exports.default = default_1;
//# sourceMappingURL=CommandError.js.map