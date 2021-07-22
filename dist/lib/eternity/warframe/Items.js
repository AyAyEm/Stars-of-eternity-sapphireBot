"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const JSONStream_1 = tslib_1.__importDefault(require("JSONStream"));
const event_stream_1 = tslib_1.__importDefault(require("event-stream"));
class Items {
    dir = 'data/warframe-items';
    source = 'https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/All.json';
    uniqueNameDict;
    latestUpdate;
    async _getUniqueNames() {
        return new Map(Object.entries(await fs_extra_1.default.readJson(`${this.dir}.json`)));
    }
    async getUniqueNames() {
        if (!this.uniqueNameDict) {
            try {
                this.uniqueNameDict = await this._getUniqueNames();
            }
            catch {
                await this.create();
                this.uniqueNameDict = await this._getUniqueNames();
            }
        }
        return this.uniqueNameDict;
    }
    async create() {
        const { data } = await axios_1.default.get(this.source, { responseType: 'stream' });
        await new Promise((resolve, reject) => {
            const writes = [];
            data
                .pipe(JSONStream_1.default.parse('*'))
                .pipe(event_stream_1.default.mapSync((item) => {
                writes.push(fs_extra_1.default.outputJson(path_1.default.join(this.dir, item.uniqueName), item));
                return { [item.name.toLowerCase()]: item.uniqueName };
            }))
                .pipe(event_stream_1.default.writeArray((err, t) => {
                if (err)
                    reject(err);
                // eslint-disable-next-line consistent-return
                const uniqueNames = t.reduce((acc, uniqueName) => lodash_1.default.mergeWith(acc, uniqueName, (a, b) => {
                    if (a) {
                        if (lodash_1.default.isArray(a))
                            return a.concat(b);
                        if (lodash_1.default.isArray(b))
                            return b.concat(a);
                        return [a, b];
                    }
                }));
                writes.push(fs_extra_1.default.outputJSON('data/warframe-items.json', uniqueNames));
                resolve(Promise.all(writes));
            }));
        });
    }
    async get(name) {
        const uniqueNames = await this.getUniqueNames();
        const uniqueName = uniqueNames.get(name.toLowerCase());
        return fs_extra_1.default.readJSON(path_1.default.join(this.dir, typeof uniqueName === 'string' ? uniqueName : uniqueName[0]));
    }
}
exports.Items = Items;
//# sourceMappingURL=Items.js.map