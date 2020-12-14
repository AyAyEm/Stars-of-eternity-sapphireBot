"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("@lib/structures");
const decorators_1 = require("@sapphire/decorators");
const axios_1 = __importDefault(require("axios"));
let default_1 = class extends structures_1.Task {
    document = new this.client.provider.Trackers({ id: { tracker: 'fissure' } });
    fissuresUrl = 'https://api.warframestat.us/pc/fissures';
    async run() {
        axios_1.default.get(this.fissuresUrl).then(async ({ data: fissuresData }) => {
            if (process.env.NODE_ENV !== 'production')
                await this.document.reload();
            const activeFissures = fissuresData.filter(({ active }) => active);
            const fissuresIds = await this.document.get('data.cacheIds', []);
            const newFissures = activeFissures.filter((fissure) => !fissuresIds.includes(fissure.id));
            if (newFissures.length > 0) {
                // this.client.emit('warframeNewFissures', newFissures);
                this.client.emit('warframeNewActiveFissures', activeFissures);
                const updatedFissureIds = fissuresData.map(({ id }) => id);
                await this.document.set('data.cacheIds', updatedFissureIds);
            }
        })
            .catch((err) => {
            if (err.message.includes('Request failed'))
                return;
            console.error(err);
        });
    }
};
default_1 = __decorate([
    decorators_1.ApplyOptions({ time: 10000 })
], default_1);
exports.default = default_1;
//# sourceMappingURL=FissureTracker.js.map