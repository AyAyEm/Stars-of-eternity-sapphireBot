"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
let Message = class Message extends _structures_1.EternityBaseEntity {
    id;
    channel;
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 19 }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne('Channel', (channel) => channel.messages),
    tslib_1.__metadata("design:type", Function)
], Message.prototype, "channel", void 0);
Message = tslib_1.__decorate([
    typeorm_1.Entity()
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map