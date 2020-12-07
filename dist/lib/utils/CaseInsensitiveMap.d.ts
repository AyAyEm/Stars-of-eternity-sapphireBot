/**
 * Map designed to work with keys case being insensitive.
 */
export declare class CIMap<K, V> extends Map<K, V> {
    #private;
    constructor(entries?: [K, V][]);
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): this;
}
