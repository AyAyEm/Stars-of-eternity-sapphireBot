"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
const Guild_1 = require("../Guild");
const User_1 = require("../User");
let Item = class Item extends _structures_1.EternityBaseEntity {
    id;
    name;
    guilds;
    users;
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ type: 'varchar', length: 250, nullable: false, unique: true }),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => Guild_1.Guild),
    typeorm_1.JoinTable({ name: 'item_guild' }),
    tslib_1.__metadata("design:type", Array)
], Item.prototype, "guilds", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => User_1.User),
    typeorm_1.JoinTable({ name: 'item_user' }),
    tslib_1.__metadata("design:type", Array)
], Item.prototype, "users", void 0);
Item = tslib_1.__decorate([
    typeorm_1.Entity({ schema: 'warframe' })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map