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

interface Obj extends Object {
  prototype?: unknown;
}

export function getOwnMethods<T extends Obj>(object: T) {
  const props: string[] = [];

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
