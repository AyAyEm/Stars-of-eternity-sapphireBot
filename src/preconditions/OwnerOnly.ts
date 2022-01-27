import { Message } from 'discord.js';
import {
  Awaitable,
  err, 
  Precondition, 
  Result,
  UserError,
} from '@sapphire/framework';

import { config } from '#root/config';

export class OwnerOnly extends Precondition {
  public run(message: Message): Awaitable<Result<unknown, UserError>> {
    if (config.ownersIds.includes(message.author.id)) return this.ok();
    return err(new UserError({
      identifier: 'ownerOnly',
      message: 'Only the owner is allowed to execute this command.',
    }));
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    OwnerOnly: never;
  }
}
