"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends framework_1.Listener {
    async run(err) {
        this.container.client.logger.error(err);
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ event: framework_1.Events.Error })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Error.js.map