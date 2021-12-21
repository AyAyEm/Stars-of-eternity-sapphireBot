import { Listener, Events, UserError, CommandErrorPayload } from '@sapphire/framework';
import { sendLocalized } from '@sapphire/plugin-i18next';
import { ApplyOptions } from '@sapphire/decorators';

import type { Message } from 'discord.js';

import { CommandError } from '#lib';

type PossibleErrors = Error | CommandError | UserError | unknown;

interface EternityCommandErrorPayload extends CommandErrorPayload {
  message: Message;
}

@ApplyOptions<Listener.Options>({ event: Events.CommandError })
export default class extends Listener {
  public run(error: PossibleErrors, { message, piece }: EternityCommandErrorPayload) {
    if (error instanceof CommandError) {
      sendLocalized(message.channel, `commands/${piece.name}:${error.identifier}`);
    } else if (error instanceof UserError) {
      sendLocalized(message.channel, error.identifier);
    } else {
      this.container.client.logger.error(error);
    }
  }
}
