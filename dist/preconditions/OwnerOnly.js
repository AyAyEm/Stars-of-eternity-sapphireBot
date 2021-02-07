"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPrecondition = void 0;
const framework_1 = require("@sapphire/framework");
const config_1 = require("@root/config");
class ClientPrecondition extends framework_1.Precondition {
    run(message) {
        if (config_1.config.ownersIds.includes(message.author.id))
            return this.ok();
        return framework_1.err(new framework_1.UserError({
            identifier: 'ownerOnly',
            message: 'Only the owner is allowed to execute this command.',
        }));
    }
}
exports.ClientPrecondition = ClientPrecondition;
//# sourceMappingURL=OwnerOnly.js.map