"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const structures_1 = require("../../lib/structures");
const decorators_1 = require("@sapphire/decorators");
const axios_1 = tslib_1.__importDefault(require("axios"));
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
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ time: 10000 })
], default_1);
exports.default = default_1;
//# sourceMappingURL=FissureTracker.js.map