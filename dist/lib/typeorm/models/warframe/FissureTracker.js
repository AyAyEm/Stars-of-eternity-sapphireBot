"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FissureTracker = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const _structures_1 = require("../../../structures");
const Message_1 = require("../Message");
const Channel_1 = require("../Channel");
let FissureTracker = class FissureTracker extends _structures_1.EternityBaseEntity {
    id;
    message;
    channel;
    enabled;
    tier;
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], FissureTracker.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(() => Message_1.Message, { nullable: false }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", Message_1.Message)
], FissureTracker.prototype, "message", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => Channel_1.Channel, { nullable: false }),
    tslib_1.__metadata("design:type", Channel_1.Channel)
], FissureTracker.prototype, "channel", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: false, default: true }),
    tslib_1.__metadata("design:type", Boolean)
], FissureTracker.prototype, "enabled", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'int', nullable: false }),
    tslib_1.__metadata("design:type", Number)
], FissureTracker.prototype, "tier", void 0);
FissureTracker = tslib_1.__decorate([
    typeorm_1.Entity({ schema: 'warframe' }),
    typeorm_1.Unique(['tier', 'channel'])
], FissureTracker);
exports.FissureTracker = FissureTracker;
//# sourceMappingURL=FissureTracker.js.map