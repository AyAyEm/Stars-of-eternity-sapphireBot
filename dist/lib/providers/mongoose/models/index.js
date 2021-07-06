"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.schemas = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const Guilds_1 = require("./Guilds");
const Trackers_1 = require("./Trackers");
const Users_1 = require("./Users");
const Utils_1 = require("./Utils");
tslib_1.__exportStar(require("./Guilds"), exports);
tslib_1.__exportStar(require("./Trackers"), exports);
tslib_1.__exportStar(require("./Users"), exports);
tslib_1.__exportStar(require("./Utils"), exports);
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
//# sourceMappingURL=index.js.map