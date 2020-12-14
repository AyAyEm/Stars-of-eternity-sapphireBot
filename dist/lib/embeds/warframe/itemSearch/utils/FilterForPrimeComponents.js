"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterForPrimeComponents = void 0;
function filterForPrimeComponents(components) {
    return components
        .filter(({ drops = [] }) => drops[0]?.location?.toLowerCase().includes('relic'));
}
exports.filterForPrimeComponents = filterForPrimeComponents;
//# sourceMappingURL=FilterForPrimeComponents.js.map