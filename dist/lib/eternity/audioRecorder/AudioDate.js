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
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioDate = void 0;
const moment = __importStar(require("moment-timezone"));
require("twix");
const _config_1 = require("@config");
function audioDate() {
    const startDate = moment.tz(_config_1.timezone);
    const formatOptions = 'DD-MM-YYTHH_mm';
    return {
        startToEndDate: () => {
            const endingDate = moment.tz(_config_1.timezone);
            return startDate.twix(endingDate).format({
                dayFormat: '-MM',
                monthFormat: 'DD',
                yearFormat: '-YY',
                hourFormat: 'THH_',
                minuteFormat: 'mm_ss',
            }).replace(/[ ,:]/g, '');
        },
        startDate: startDate.format(formatOptions),
        newDate: () => moment.tz(_config_1.timezone).format('DD/MM/YYYY HH:mm:ss'),
    };
}
exports.audioDate = audioDate;
