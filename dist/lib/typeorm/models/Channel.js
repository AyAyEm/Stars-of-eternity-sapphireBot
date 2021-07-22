"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
const Guild_1 = require("./Guild");
let Channel = class Channel extends _structures_1.EternityBaseEntity {
    id;
    name;
    messages;
    guild;
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 19 }),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 255, nullable: false }),
    tslib_1.__metadata("design:type", String)
], Channel.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany('Message', (message) => message.channel),
    tslib_1.__metadata("design:type", Array)
], Channel.prototype, "messages", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne('Guild', (guild) => guild.channels),
    tslib_1.__metadata("design:type", Guild_1.Guild)
], Channel.prototype, "guild", void 0);
Channel = tslib_1.__decorate([
    typeorm_1.Entity()
], Channel);
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map