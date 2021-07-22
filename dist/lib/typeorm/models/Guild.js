"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../structures");
let Guild = class Guild extends _structures_1.EternityBaseEntity {
    id;
    users;
    channels;
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 19 }),
    tslib_1.__metadata("design:type", String)
], Guild.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany('User', (user) => user.guilds),
    typeorm_1.JoinTable({ name: 'guild_user' }),
    tslib_1.__metadata("design:type", Array)
], Guild.prototype, "users", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany('Channel', (channel) => channel.guild),
    tslib_1.__metadata("design:type", Array)
], Guild.prototype, "channels", void 0);
Guild = tslib_1.__decorate([
    typeorm_1.Entity()
], Guild);
exports.Guild = Guild;
//# sourceMappingURL=Guild.js.map