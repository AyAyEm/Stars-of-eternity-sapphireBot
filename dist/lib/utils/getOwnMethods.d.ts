interface Obj extends Object {
    prototype?: unknown;
}
export declare function getOwnMethods<T extends Obj>(object: T): string[];
export {};
