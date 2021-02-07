"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _lib_1 = require("@lib");
const decorators_1 = require("@sapphire/decorators");
let default_1 = class extends _lib_1.EternityCommand {
    async run(msg, args) {
        const ammount = await args.pick('number');
        if (ammount >= 100) {
            msg.replyTranslated('commands/purge:exceededLimit');
        }
        else {
            msg.channel.bulkDelete(Number(ammount) + 1)
                .catch((err) => msg.channel.sendTranslated('commands/purge:error', [{ err: err.message }]));
        }
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({
        preconditions: ['OwnerOnly'],
        requiredArgs: ['number'],
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=Purge.js.map