"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const async_1 = tslib_1.__importDefault(require("async"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const app_root_path_1 = tslib_1.__importDefault(require("app-root-path"));
class Items {
    dir = path_1.default.join(app_root_path_1.default.path, 'data/warframe-items');
    source = 'https://raw.githubusercontent.com/WFCD/warframe-items/development/data/json/All.json';
    _uniqueNameDict;
    latestUpdate;
    getUniqueNameDict() {
        if (!this._uniqueNameDict) {
            const result = Promise.resolve().then(() => tslib_1.__importStar(require(`${this.dir}.json`))).catch(() => this.create())
                .then(() => Promise.resolve().then(() => tslib_1.__importStar(require(`${this.dir}.json`))))
                .catch(console.error);
            result.then((uniqueNameDict) => {
                if (uniqueNameDict)
                    this._uniqueNameDict = uniqueNameDict;
            });
            return result;
        }
        return this._uniqueNameDict;
    }
    async create() {
        const { data } = await axios_1.default.get(this.source);
        const dataDict = lodash_1.default.fromPairs(lodash_1.default.map(data, ({ name, uniqueName }) => ([name.toLowerCase(), uniqueName])));
        this._uniqueNameDict = dataDict;
        fs_extra_1.default.outputJson(`${this.dir}.json`, dataDict);
        const operations = data.map((item) => async () => (fs_extra_1.default.outputJson(path_1.default.join(this.dir, `${item.uniqueName}.json`), item)));
        return new Promise((resolve, reject) => {
            async_1.default.parallelLimit(operations, 64, (error) => {
                if (error)
                    reject(error);
                else
                    resolve(undefined);
            });
            this.latestUpdate = new Date();
        });
    }
    async get(name) {
        const uniqueNameDict = await this.getUniqueNameDict();
        return Promise.resolve().then(() => tslib_1.__importStar(require(path_1.default.join(this.dir, uniqueNameDict[name.toLowerCase()]))));
    }
}
exports.Items = Items;
//# sourceMappingURL=Items.js.map