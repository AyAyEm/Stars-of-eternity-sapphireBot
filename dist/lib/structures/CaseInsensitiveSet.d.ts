export declare class CaseInsensitiveSet<Key extends string> extends Set<Key> {
    constructor(keys: Key[]);
    add(key: Key): this;
    has(key: Key): boolean;
    delete(key: Key): boolean;
    clear(): void;
}
