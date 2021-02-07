import { UserError, CommandErrorPayload } from '@sapphire/framework';

import type { EternityCommand, EternityMessage } from '@lib';

export interface EternityCommandErrorPayload extends CommandErrorPayload {
  piece: EternityCommand;
  message: EternityMessage;
}

export class CommandError extends UserError {
  public readonly command: EternityCommand;

  public readonly payload: CommandErrorPayload;

  public get name() { return 'CommandError'; }
}
