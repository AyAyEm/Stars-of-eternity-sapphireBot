import { getCustomRepository } from 'typeorm';
import { ApplyOptions } from '@sapphire/decorators';
import axios from 'axios';

import { Task, TaskOptions } from '#lib/structures';
import { WarframeInvasionRepo } from '#repositories';

import type { InvasionData } from '#lib/types/Warframe';

@ApplyOptions<TaskOptions>({ time: 120000 })
export default class InvasionTracker extends Task {
  public invasionUrl = 'https://api.warframestat.us/pc/invasions';

  public async run() {
    axios.get(this.invasionUrl).then(async ({ data: invasionsData }: { data: InvasionData[] }) => {
      const invasionRepo = getCustomRepository(WarframeInvasionRepo);
      const { activation: latestActivation = '0' } = (await invasionRepo.findLatest()) ?? {};

      const getTime = (timestamp: string) => new Date(timestamp).getTime();

      const activeInvasions = invasionsData.filter(({ completed }) => !completed);
      const newInvasions = activeInvasions.filter(({ activation }) => (
        getTime(activation) > getTime(latestActivation)));

      if (newInvasions.length > 0) {
        await invasionRepo.insert(newInvasions);

        this.container.client.emit('warframeNewInvasions', newInvasions);
      }
    })
      .catch((err) => {
        if (err.message.includes('Request failed')) return;
        this.container.client.logger.error(err);
      });
  }
}
