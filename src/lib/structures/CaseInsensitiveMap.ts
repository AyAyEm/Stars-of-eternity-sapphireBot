export class CaseInsensitiveMap<K extends string | number, V> extends Map<K, V> {
  private dict: Map<string, string>;

  public constructor(entries: [K, V][]) {
    super(entries);

    this.dict = new Map();

    entries.forEach(([key]) => this.dict.set(`${key}`.toLowerCase(), `${key}`));
  }

  public get(key: K) {
    return super.get(this.dict.get(`${key}`.toLowerCase()) as K);
  }

  public has(key: K) {
    return this.dict.has(`${key}`.toLowerCase());
  }

  public delete(key: K) {
    const loweredKey = `${key}`.toLowerCase();
    super.delete(this.dict.get(loweredKey) as K);

    return this.dict.delete(loweredKey);
  }
}
