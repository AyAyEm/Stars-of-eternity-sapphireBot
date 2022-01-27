import { ApplyOptions } from '@sapphire/decorators';
import axios from 'axios';

import { Task, TaskOptions } from '#lib/structures';

import type { InvasionData } from '#lib/types/Warframe';

@ApplyOptions<TaskOptions>({ time: 120000 })
export default class InvasionTracker extends Task {
  public invasionUrl = 'https://api.warframestat.us/pc/invasions';

  public async run() {
    const { redisClient } = this.container;
    let latestActivation = await redisClient.get('latestWarframeInvasionActivation');

    axios.get(this.invasionUrl).then(async ({ data: invasionsData }: { data: InvasionData[] }) => {
      const getTime = (timestamp: string) => new Date(timestamp).getTime();

      const activeInvasions = invasionsData.filter(({ completed }) => !completed);
      const newInvasions = activeInvasions.filter(({ activation }) => (
        getTime(activation) > getTime(latestActivation)));

      if (newInvasions.length > 0) {
        this.container.client.emit('warframeNewInvasions', newInvasions);

        latestActivation = newInvasions.reduce((acc, { activation }) => (
          getTime(activation) > getTime(acc) ? activation : acc), latestActivation);
        this.container.redisClient.set('latestWarframeInvasionActivation', latestActivation);
      }
    })
      .catch((err) => {
        if (err.message.includes('Request failed')) return;
        this.container.client.logger.error(err);
      });
  }
}
