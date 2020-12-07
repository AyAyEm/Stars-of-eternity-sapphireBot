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
export declare function biFilter<T>(array: T[], callbackFn: Function, thisArg?: any): [Array<T>, Array<T>];
