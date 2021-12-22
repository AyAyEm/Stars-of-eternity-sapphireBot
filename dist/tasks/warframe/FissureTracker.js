"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const decorators_1 = require("@sapphire/decorators");
const structures_1 = require("../../lib/structures");
let default_1 = class extends structures_1.Task {
    fissuresUrl = 'https://api.warframestat.us/pc/fissures';
    async run() {
        const { redisClient } = this.container;
        let latestActivation = (await redisClient.get('latestWarframeFissureActivation')) ?? '0';
        axios_1.default.get(this.fissuresUrl).then(async ({ data: fissuresData }) => {
            const getTime = (timestamp) => new Date(timestamp).getTime();
            const activeFissures = fissuresData.filter(({ active }) => active);
            const newFissuresTiers = activeFissures
                .filter(({ activation }) => getTime(activation) > +latestActivation)
                .map(({ tier }) => tier);
            if (newFissuresTiers.length > 0) {
                const toEmitFissures = activeFissures.filter(({ tier }) => newFissuresTiers.includes(tier));
                this.container.client.emit('warframeNewActiveFissures', toEmitFissures);
                latestActivation = (0, lodash_1.default)(toEmitFissures)
                    .map(({ activation }) => getTime(activation))
                    .max()
                    .toString();
                this.container.redisClient.set('latestWarframeFissureActivation', latestActivation);
            }
        })
            .catch((err) => {
            if (err.message.includes('Request failed'))
                return;
            this.container.client.logger.error(err);
        });
    }
};
default_1 = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({ time: 60000 })
], default_1);
exports.default = default_1;
//# sourceMappingURL=FissureTracker.js.map