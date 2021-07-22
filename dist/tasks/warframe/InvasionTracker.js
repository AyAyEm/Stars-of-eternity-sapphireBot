"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const decorators_1 = require("@sapphire/decorators");
const axios_1 = tslib_1.__importDefault(require("axios"));
const structures_1 = require("../../lib/structures");
const _repositories_1 = require("../../lib/typeorm/repositories");
let InvasionTracker = class InvasionTracker extends structures_1.Task {
    invasionUrl = 'https://api.warframestat.us/pc/invasions';
    get invasionRepo() {
        return typeorm_1.getCustomRepository(_repositories_1.InvasionRepository);
    }
    async run() {
        axios_1.default.get(this.invasionUrl).then(async ({ data: invasionsData }) => {
            const { invasionRepo } = this;
            const { activation: latestActivation = '0' } = (await invasionRepo.findLatest()) ?? {};
            const getTime = (timestamp) => new Date(timestamp).getTime();
            const activeInvasions = invasionsData.filter(({ completed }) => !completed);
            const newInvasions = activeInvasions.filter(({ activation }) => (getTime(activation) > getTime(latestActivation)));
            if (newInvasions.length > 0) {
                await invasionRepo.insert(newInvasions);
                this.client.emit('warframeNewInvasions', newInvasions);
            }
        })
            .catch((err) => {
            if (err.message.includes('Request failed'))
                return;
            this.client.console.error(err);
        });
    }
};
InvasionTracker = tslib_1.__decorate([
    decorators_1.ApplyOptions({ time: 120000 })
], InvasionTracker);
exports.default = InvasionTracker;
//# sourceMappingURL=InvasionTracker.js.map