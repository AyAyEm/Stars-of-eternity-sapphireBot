import { EternityEvent, CommandError } from '@lib';
import { ApplyOptions } from '@sapphire/decorators';
import { Events, UserError } from '@sapphire/framework';

import type { EventOptions, CommandErrorPayload } from '@sapphire/framework';
import type { EternityMessage } from '@lib';

type PossibleErrors = Error | CommandError | UserError | unknown;

interface EternityCommandErrorPayload extends CommandErrorPayload {
  message: EternityMessage;
}

@ApplyOptions<EventOptions>({ event: Events.CommandError })
export default class extends EternityEvent<Events.CommandError> {
  public run(error: PossibleErrors, { message, piece }: EternityCommandErrorPayload) {
    if (error instanceof CommandError) {
      message.channel.sendTranslated(`commands/${piece.name}:${error.identifier}`);
    } else if (error instanceof UserError) {
      message.channel.sendTranslated(error.identifier);
    } else {
      this.client.console.error(error);
    }
  }
}
