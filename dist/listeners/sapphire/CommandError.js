"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const plugin_i18next_1 = require("@sapphire/plugin-i18next");
const decorators_1 = require("@sapphire/decorators");
const _lib_1 = require("../../lib");
let default_1 = class extends framework_1.Listener {
    run(error, { message, piece }) {
        if (error instanceof _lib_1.CommandError) {
            (0, plugin_i18next_1.sendLocalized)(message.channel, `commands/${piece.name}:${error.identifier}`);
        }
        else if (error instanceof framework_1.UserError) {
            (0, plugin_i18next_1.sendLocalized)(message.channel, error.identifier);
        }
        else {
            this.container.client.logger.error(error);
        }
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ event: framework_1.Events.CommandError })
], default_1);
exports.default = default_1;
//# sourceMappingURL=CommandError.js.map