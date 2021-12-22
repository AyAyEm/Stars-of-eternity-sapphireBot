"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerOnly = void 0;
const framework_1 = require("@sapphire/framework");
const config_1 = require("../config");
class OwnerOnly extends framework_1.Precondition {
    run(message) {
        if (config_1.config.ownersIds.includes(message.author.id))
            return this.ok();
        return (0, framework_1.err)(new framework_1.UserError({
            identifier: 'ownerOnly',
            message: 'Only the owner is allowed to execute this command.',
        }));
    }
}
exports.OwnerOnly = OwnerOnly;
//# sourceMappingURL=OwnerOnly.js.map