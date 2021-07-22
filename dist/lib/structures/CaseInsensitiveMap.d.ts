export declare class CaseInsensitiveMap<K extends string | number, V> extends Map<K, V> {
    #private;
    constructor(entries: [K, V][]);
    get(key: K): V;
    set(key: K, value: V): this;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
}
