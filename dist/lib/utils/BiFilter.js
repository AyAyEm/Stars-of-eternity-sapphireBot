"use strict";
/**
 * Filter an array into two arrays.
 *
 * Defined by the callbackFn, the first array will be with the true elements
 * and the second array will be with the false elements.
 *
 * @param {Array} array
 * @param {Function} callbackFn
 * @param {Object} thisArg
 * @return {[Array, Array]} A matrix with two arrays.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.biFilter = void 0;
function biFilter(array, callbackFn, thisArg) {
    const [trueElements, falseElements] = [[], []];
    for (let i = 0; i < array.length; i += 1) {
        const element = array[i];
        if (callbackFn.call(thisArg, element, i, array)) {
            trueElements.push(element);
        }
        else {
            falseElements.push(element);
        }
    }
    return [trueElements, falseElements];
}
exports.biFilter = biFilter;
//# sourceMappingURL=BiFilter.js.map