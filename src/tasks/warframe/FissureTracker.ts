import _ from 'lodash';
import axios from 'axios';
import { ApplyOptions } from '@sapphire/decorators';

import { Task, TaskOptions } from '#lib/structures';

import type { Fissure } from '#lib/types/Warframe';

@ApplyOptions<TaskOptions>({ time: 60000 })
export default class extends Task {
  public fissuresUrl = 'https://api.warframestat.us/pc/fissures';

  public async run() {
    const { redisClient } = this.container;
    let latestActivation = (await redisClient.get('latestWarframeFissureActivation')) ?? '0';

    console.log(latestActivation);
    axios.get(this.fissuresUrl).then(async ({ data: fissuresData }: { data: Fissure[] }) => {
      const getTime = (timestamp: string) => new Date(timestamp).getTime();

      const activeFissures = fissuresData.filter(({ active }) => active);
      const newFissuresTiers = activeFissures
        .filter(({ activation }) => getTime(activation) > +latestActivation)
        .map(({ tier }) => tier);

      if (newFissuresTiers.length > 0) {
        const toEmitFissures = activeFissures.filter(({ tier }) => newFissuresTiers.includes(tier));
        this.container.client.emit('warframeNewActiveFissures', toEmitFissures);

        latestActivation = _(toEmitFissures)
          .map(({ activation }) => getTime(activation))
          .max()
          .toString();
        this.container.redisClient.set('latestWarframeFissureActivation', latestActivation);
      }
    })
      .catch((err) => {
        if (err.message.includes('Request failed')) return;
        this.container.client.logger.error(err);
      });
  }
}
