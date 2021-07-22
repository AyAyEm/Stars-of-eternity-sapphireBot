import _ from 'lodash';
import axios from 'axios';
import fse from 'fs-extra';
import path from 'path';
import JSONStream from 'JSONStream';
import es from 'event-stream';

import type { Readable } from 'stream';
import type { Item } from 'warframe-items';

export class Items {
  public readonly dir = 'data/warframe-items';

  public readonly source = 'https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/All.json';

  private uniqueNameDict: Map<string, string | string[]>;

  public latestUpdate?: Date;

  private async _getUniqueNames() {
    return new Map<string, string | string[]>(Object.entries(await fse.readJson(`${this.dir}.json`)));
  }

  public async getUniqueNames() {
    if (!this.uniqueNameDict) {
      try {
        this.uniqueNameDict = await this._getUniqueNames();
      } catch {
        await this.create();
        this.uniqueNameDict = await this._getUniqueNames();
      }
    }

    return this.uniqueNameDict;
  }

  public async create() {
    const { data } = await axios.get<Readable>(this.source, { responseType: 'stream' });

    await new Promise((resolve, reject) => {
      const writes = [];
      data
        .pipe(JSONStream.parse('*'))
        .pipe(es.mapSync((item: Item) => {
          writes.push(fse.outputJson(path.join(this.dir, item.uniqueName), item));
          return { [item.name.toLowerCase()]: item.uniqueName };
        }))
        .pipe(es.writeArray((err: Error, t: Record<string, string[]>[]) => {
          if (err) reject(err);
          // eslint-disable-next-line consistent-return
          const uniqueNames = t.reduce((acc, uniqueName) => _.mergeWith(acc, uniqueName, (a, b) => {
            if (a) {
              if (_.isArray(a)) return a.concat(b);
              if (_.isArray(b)) return b.concat(a);

              return [a, b];
            }
          }));

          writes.push(fse.outputJSON('data/warframe-items.json', uniqueNames));
          resolve(Promise.all(writes));
        }));
    });
  }

  public async get(name: string): Promise<Item | null> {
    const uniqueNames = await this.getUniqueNames();
    const uniqueName = uniqueNames.get(name.toLowerCase());

    return fse.readJSON(path.join(this.dir, typeof uniqueName === 'string' ? uniqueName : uniqueName[0]));
  }
}
