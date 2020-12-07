"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const async_1 = __importDefault(require("async"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const Root = require("app-root-path");
class Items {
    dir = path_1.default.join(Root.path, 'data\\warframe-items');
    source = 'https://raw.githubusercontent.com/WFCD/warframe-items/development/data/json/All.json';
    _uniqueNameDict;
    latestUpdate;
    get uniqueNameDict() {
        if (!this._uniqueNameDict) {
            const result = Promise.resolve().then(() => __importStar(require(`${this.dir}.json`)));
            result.then((uniqueNameDict) => {
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
        async_1.default.parallelLimit(operations, 64);
        this.latestUpdate = new Date();
    }
    async get(name, createIfNotExists = false) {
        const uniqueNameDict = await this.uniqueNameDict;
        if (!this.uniqueNameDict && createIfNotExists)
            await this.create();
        else if (!uniqueNameDict && !createIfNotExists)
            return null;
        return Promise.resolve().then(() => __importStar(require(path_1.default.join(this.dir, uniqueNameDict[name.toLowerCase()]))));
    }
}
exports.Items = Items;
