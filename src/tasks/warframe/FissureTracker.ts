import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository } from 'typeorm';
import axios from 'axios';

import { Task, TaskOptions } from '#lib/structures';
import { WarframeFissureRepo } from '#repositories';

import type { Fissure } from '#lib/types/Warframe';

@ApplyOptions<TaskOptions>({ time: 60000 })
export default class extends Task {
  public fissuresUrl = 'https://api.warframestat.us/pc/fissures';

  public async run() {
    const fissureRepo = getCustomRepository(WarframeFissureRepo);
    axios.get(this.fissuresUrl).then(async ({ data: fissuresData }: { data: Fissure[] }) => {
      const { activation: latestActivation = '0' } = (await fissureRepo.findLatest()) ?? {};

      const getTime = (timestamp: string) => new Date(timestamp).getTime();

      const activeFissures = fissuresData.filter(({ active }) => active);
      const newFissures = activeFissures.filter(({ activation }) => (
        getTime(activation) > getTime(latestActivation)));

      if (newFissures.length > 0) {
        await fissureRepo.insert(newFissures);

        this.container.client.emit('warframeNewActiveFissures', newFissures);
      }
    })
      .catch((err) => {
        if (err.message.includes('Request failed')) return;
        this.container.client.logger.error(err);
      });
  }
}
