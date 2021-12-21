import { Events, Listener, ArgumentError } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

import { CommandError } from '#lib';

type PossibleErrors = ArgumentError<unknown> | CommandError | Error;

@ApplyOptions<Listener.Options>({ event: Events.Error })
export default class extends Listener {
  public async run(error: PossibleErrors) {
    if (error instanceof CommandError) return;
    if (error instanceof ArgumentError) {
      this.container.client.logger.error(error);
    } else {
      this.container.client.logger.info(error);
    }
  }
}
