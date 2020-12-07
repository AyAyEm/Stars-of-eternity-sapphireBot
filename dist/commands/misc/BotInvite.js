"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("@sapphire/decorators");
const _lib_1 = require("@lib");
let default_1 = class extends _lib_1.EternityCommand {
    async run(msg) {
        msg.channel.sendAndDelete(this.client.invite, { timeout: 10000 });
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({
        preconditions: ['OwnerOnly'],
    })
], default_1);
exports.default = default_1;
