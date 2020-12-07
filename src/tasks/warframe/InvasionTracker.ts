import { Task, TaskOptions } from '@lib/structures';
import { ApplyOptions } from '@sapphire/decorators';
import axios from 'axios';

import type { InvasionData } from '@lib/types/Warframe';

@ApplyOptions<TaskOptions>({ time: 10000 })
export default class InvasionTracker extends Task {
  public document = new this.client.provider.Trackers({ id: { tracker: 'invasion' } });

  public invasionUrl = 'https://api.warframestat.us/pc/invasions';

  public async onLoad() {
    await super.onLoad();
    await this.document.load;
  }

  public async run() {
    axios.get(this.invasionUrl).then(async ({ data: invasionsData }: { data: InvasionData[] }) => {
      if (process.env.NODE_ENV !== 'production') await this.document.reload();

      const activeInvasions = invasionsData.filter(({ completed }) => !completed);

      const invasionsIds = await this.document.get<string[]>('data.cacheIds', []);

      const newInvasions = activeInvasions.filter(({ id }) => !invasionsIds.includes(id));

      if (newInvasions.length > 0) {
        this.client.emit('warframeNewInvasions', newInvasions);

        const updatedInvasionsIds = invasionsData.map(({ id }) => id);
        await this.document.set('data.cacheIds', updatedInvasionsIds);
      }
    })
      .catch((err) => {
        if (err.message.includes('Request failed')) return;
        console.error(err);
      });
  }
}
