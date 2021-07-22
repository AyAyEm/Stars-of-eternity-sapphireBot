"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvasionTracker = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Channel_1 = require("../Channel");
const _structures_1 = require("../../../structures");
const Item_1 = require("./Item");
let InvasionTracker = class InvasionTracker extends _structures_1.EternityBaseEntity {
    id;
    items;
    channel;
    enabled;
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], InvasionTracker.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToMany(() => Item_1.Item),
    typeorm_1.JoinTable({ name: 'invasion_tracker_item' }),
    tslib_1.__metadata("design:type", Array)
], InvasionTracker.prototype, "items", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(() => Channel_1.Channel, { nullable: false }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", Channel_1.Channel)
], InvasionTracker.prototype, "channel", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: false, default: true }),
    tslib_1.__metadata("design:type", Boolean)
], InvasionTracker.prototype, "enabled", void 0);
InvasionTracker = tslib_1.__decorate([
    typeorm_1.Entity({ schema: 'warframe' })
], InvasionTracker);
exports.InvasionTracker = InvasionTracker;
//# sourceMappingURL=InvasionTracker.js.map