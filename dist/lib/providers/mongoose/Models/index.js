"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.schemas = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Guilds_1 = require("./Guilds");
const Trackers_1 = require("./Trackers");
const Users_1 = require("./Users");
const Utils_1 = require("./Utils");
__exportStar(require("./Guilds"), exports);
__exportStar(require("./Trackers"), exports);
__exportStar(require("./Users"), exports);
__exportStar(require("./Utils"), exports);
exports.schemas = {
    Guilds: Guilds_1.Guilds,
    Trackers: Trackers_1.Trackers,
    Users: Users_1.Users,
    Utils: Utils_1.Utils,
};
exports.models = {
    Guilds: typegoose_1.getModelForClass(Guilds_1.Guilds),
    Trackers: typegoose_1.getModelForClass(Trackers_1.Trackers),
    Users: typegoose_1.getModelForClass(Users_1.Users),
    Utils: typegoose_1.getModelForClass(Utils_1.Utils),
};
