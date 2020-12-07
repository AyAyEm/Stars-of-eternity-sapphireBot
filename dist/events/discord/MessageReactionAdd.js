"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _lib_1 = require("@lib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
const eternity_1 = require("@lib/eternity");
let default_1 = class extends _lib_1.EternityEvent {
    async run(messageReaction, user) {
        eternity_1.roleReactionManager.call(this, messageReaction, user, 'add');
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({ event: framework_1.Events.MessageReactionRemove })
], default_1);
exports.default = default_1;
