"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const typeorm_1 = require("typeorm");
const axios_1 = tslib_1.__importDefault(require("axios"));
const structures_1 = require("../../lib/structures");
const _repositories_1 = require("../../lib/typeorm/repositories");
let default_1 = class extends structures_1.Task {
    fissuresUrl = 'https://api.warframestat.us/pc/fissures';
    get fissureRepo() {
        return typeorm_1.getCustomRepository(_repositories_1.FissureRepository);
    }
    async run() {
        axios_1.default.get(this.fissuresUrl).then(async ({ data: fissuresData }) => {
            const { fissureRepo } = this;
            const { activation: latestActivation = '0' } = (await fissureRepo.findLatest()) ?? {};
            const getTime = (timestamp) => new Date(timestamp).getTime();
            const activeInvasions = fissuresData.filter(({ active }) => active);
            const newFissures = activeInvasions.filter(({ activation }) => (getTime(activation) > getTime(latestActivation)));
            if (newFissures.length > 0) {
                await fissureRepo.insert(newFissures);
                this.client.emit('warframeNewActiveFissures', newFissures);
            }
        })
            .catch((err) => {
            if (err.message.includes('Request failed'))
                return;
            this.client.console.error(err);
        });
    }
};
default_1 = tslib_1.__decorate([
    decorators_1.ApplyOptions({ time: 60000 })
], default_1);
exports.default = default_1;
//# sourceMappingURL=FissureTracker.js.map