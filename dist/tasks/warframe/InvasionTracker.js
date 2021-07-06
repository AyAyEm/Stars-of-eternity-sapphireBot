"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const structures_1 = require("../../lib/structures");
const decorators_1 = require("@sapphire/decorators");
const axios_1 = tslib_1.__importDefault(require("axios"));
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
InvasionTracker = tslib_1.__decorate([
    decorators_1.ApplyOptions({ time: 10000 })
], InvasionTracker);
exports.default = InvasionTracker;
//# sourceMappingURL=InvasionTracker.js.map