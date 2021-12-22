"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const structures_1 = require("../../lib/structures");
let InvasionTracker = class InvasionTracker extends structures_1.Task {
    invasionUrl = 'https://api.warframestat.us/pc/invasions';
    async run() {
        const { redisClient } = this.container;
        let latestActivation = await redisClient.get('latestWarframeInvasionActivation');
        axios_1.default.get(this.invasionUrl).then(async ({ data: invasionsData }) => {
            const getTime = (timestamp) => new Date(timestamp).getTime();
            const activeInvasions = invasionsData.filter(({ completed }) => !completed);
            const newInvasions = activeInvasions.filter(({ activation }) => (getTime(activation) > getTime(latestActivation)));
            if (newInvasions.length > 0) {
                this.container.client.emit('warframeNewInvasions', newInvasions);
                latestActivation = newInvasions.reduce((acc, { activation }) => (getTime(activation) > getTime(acc) ? activation : acc), latestActivation);
                this.container.redisClient.set('latestWarframeInvasionActivation', latestActivation);
            }
        })
            .catch((err) => {
            if (err.message.includes('Request failed'))
                return;
            this.container.client.logger.error(err);
        });
    }
};
InvasionTracker = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ time: 120000 })
], InvasionTracker);
exports.default = InvasionTracker;
//# sourceMappingURL=InvasionTracker.js.map