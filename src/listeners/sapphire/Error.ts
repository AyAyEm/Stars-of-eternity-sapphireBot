import { Events, Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Listener.Options>({ event: Events.Error })
export default class extends Listener {
  public async run(err: Error) {
    this.container.client.logger.error(err);
  }
}
