import { UserError, CommandErrorPayload } from '@sapphire/framework';
import { Message } from 'discord.js';

import type { EternityCommand } from '#lib';

export interface EternityCommandErrorPayload extends CommandErrorPayload {
  piece: EternityCommand;
  message: Message;
}

export class CommandError extends UserError {
  public readonly command: EternityCommand;

  public readonly payload: CommandErrorPayload;

  public get name() { return 'CommandError'; }
}
