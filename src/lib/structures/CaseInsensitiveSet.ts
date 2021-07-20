export class CaseInsensitiveSet<Key extends string> extends Set<Key> {
  public constructor(keys: Key[]) {
    super();

    keys.forEach((key) => this.add(key.toLowerCase() as Key));
  }

  public add(key: Key) {
    return super.add(key.toLowerCase() as Key);
  }

  public has(key: Key) {
    return super.has(key.toLowerCase() as Key);
  }

  public delete(key: Key) {
    return super.delete(key.toLowerCase() as Key);
  }

  public clear() {
    return super.clear();
  }
}
