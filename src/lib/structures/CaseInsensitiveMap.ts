export class CaseInsensitiveMap<K extends string | number, V> extends Map<K, V> {
  #dict: Map<string, string>;

  public constructor(entries: [K, V][]) {
    super();

    this.#dict = new Map();

    entries.forEach(([key, value]) => this.set(key, value));
  }

  public get(key: K) {
    return super.get(this.#dict.get(`${key}`.toLowerCase()) as K);
  }

  public set(key: K, value: V) {
    this.#dict.set(`${key}`.toLowerCase(), `${key}`);
    return super.set(key, value);
  }

  public has(key: K) {
    return this.#dict.has(`${key}`.toLowerCase());
  }

  public delete(key: K) {
    const loweredKey = `${key}`.toLowerCase();
    super.delete(this.#dict.get(loweredKey) as K);

    return this.#dict.delete(loweredKey);
  }

  public clear() {
    this.#dict.clear();

    return super.clear();
  }
}
