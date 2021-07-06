"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _lib_1 = require("../../lib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityEvent {
    async run(error) {
        if (error instanceof _lib_1.CommandError)
            return;
        if (error instanceof framework_1.ArgumentError) {
            this.client.console.error(error);
        }
        else {
            this.client.console.log(error);
        }
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ event: framework_1.Events.EventError })
], default_1);
exports.default = default_1;
//# sourceMappingURL=EventError.js.map