"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioDate = void 0;
const tslib_1 = require("tslib");
const moment = tslib_1.__importStar(require("moment-timezone"));
require("twix");
const _config_1 = require("../../../config");
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
//# sourceMappingURL=AudioDate.js.map