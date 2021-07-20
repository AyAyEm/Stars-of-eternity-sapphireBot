import { ApplyOptions } from '@sapphire/decorators';
import { getCustomRepository } from 'typeorm';
import axios from 'axios';

import { Task, TaskOptions } from '#lib/structures';
import { FissureRepository } from '#repositories';

import type { Fissure } from '#lib/types/Warframe';

@ApplyOptions<TaskOptions>({ time: 60000 })
export default class extends Task {
  public fissuresUrl = 'https://api.warframestat.us/pc/fissures';

  public get fissureRepo() {
    return getCustomRepository(FissureRepository);
  }

  public async run() {
    axios.get(this.fissuresUrl).then(async ({ data: fissuresData }: { data: Fissure[] }) => {
      const { fissureRepo } = this;
      const { activation: latestActivation = '0' } = (await fissureRepo.findLatest()) ?? {};

      const getTime = (timestamp: string) => new Date(timestamp).getTime();

      const activeInvasions = fissuresData.filter(({ active }) => active);
      const newFissures = activeInvasions.filter(({ activation }) => (
        getTime(activation) > getTime(latestActivation)));

      if (newFissures.length > 0) {
        await fissureRepo.insert(newFissures);

        this.client.emit('warframeNewActiveFissures', newFissures);
      }
    })
      .catch((err) => {
        if (err.message.includes('Request failed')) return;
        this.client.console.error(err);
      });
  }
}
