"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnMethods = void 0;
const defaultProps = new Set([
    'constructor',
    '__defineGetter__',
    '__defineSetter__',
    'hasOwnProperty',
    '__lookupGetter__',
    '__lookupSetter__',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
]);
function getOwnMethods(object) {
    const props = [];
    let obj = object.prototype ?? object;
    do {
        const properties = Object.getOwnPropertyNames(obj) || [];
        for (const property of properties) {
            if (typeof obj[property] === 'function' && !defaultProps.has(property)) {
                props.push(property);
            }
        }
        obj = Object.getPrototypeOf(obj);
    } while (obj);
    return props;
}
exports.getOwnMethods = getOwnMethods;
//# sourceMappingURL=getOwnMethods.js.map