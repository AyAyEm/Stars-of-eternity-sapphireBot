import { ApplyOptions } from '@sapphire/decorators';
import axios from 'axios';

import { Task, TaskOptions } from '#lib/structures';

import type { Fissure } from '#lib/types/Warframe';

@ApplyOptions<TaskOptions>({ time: 60000 })
export default class extends Task {
  public fissuresUrl = 'https://api.warframestat.us/pc/fissures';

  public async run() {
    const { redisClient } = this.container;
    let latestActivation = await redisClient.get('latestWarframeFissureActivation');

    axios.get(this.fissuresUrl).then(async ({ data: fissuresData }: { data: Fissure[] }) => {
      const getTime = (timestamp: string) => new Date(timestamp).getTime();

      const activeFissures = fissuresData.filter(({ active }) => active);
      const newFissures = activeFissures.filter(({ activation }) => (
        getTime(activation) > getTime(latestActivation)));

      if (newFissures.length > 0) {
        this.container.client.emit('warframeNewActiveFissures', newFissures);
        
        latestActivation = newFissures.reduce((acc, { activation }) => (
          getTime(activation) > getTime(acc) ? activation : acc), latestActivation);
        this.container.redisClient.set('latestWarframeFissureActivation', latestActivation);
      }
    })
      .catch((err) => {
        if (err.message.includes('Request failed')) return;
        this.container.client.logger.error(err);
      });
  }
}
