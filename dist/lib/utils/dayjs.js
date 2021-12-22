"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayjs = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = (0, tslib_1.__importDefault)(require("dayjs"));
const timezone_1 = (0, tslib_1.__importDefault)(require("dayjs/plugin/timezone"));
const utc_1 = (0, tslib_1.__importDefault)(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
exports.dayjs = dayjs_1.default;
exports.default = exports.dayjs;
//# sourceMappingURL=dayjs.js.map