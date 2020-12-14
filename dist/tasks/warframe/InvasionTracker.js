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
let InvasionTracker = class InvasionTracker extends structures_1.Task {
    document = new this.client.provider.Trackers({ id: { tracker: 'invasion' } });
    invasionUrl = 'https://api.warframestat.us/pc/invasions';
    async onLoad() {
        await super.onLoad();
        await this.document.load;
    }
    async run() {
        axios_1.default.get(this.invasionUrl).then(async ({ data: invasionsData }) => {
            if (process.env.NODE_ENV !== 'production')
                await this.document.reload();
            const activeInvasions = invasionsData.filter(({ completed }) => !completed);
            const invasionsIds = await this.document.get('data.cacheIds', []);
            const newInvasions = activeInvasions.filter(({ id }) => !invasionsIds.includes(id));
            if (newInvasions.length > 0) {
                this.client.emit('warframeNewInvasions', newInvasions);
                const updatedInvasionsIds = invasionsData.map(({ id }) => id);
                await this.document.set('data.cacheIds', updatedInvasionsIds);
            }
        })
            .catch((err) => {
            if (err.message.includes('Request failed'))
                return;
            console.error(err);
        });
    }
};
InvasionTracker = __decorate([
    decorators_1.ApplyOptions({ time: 10000 })
], InvasionTracker);
exports.default = InvasionTracker;
//# sourceMappingURL=InvasionTracker.js.map