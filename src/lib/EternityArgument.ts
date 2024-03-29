import { Argument, ArgumentContext } from '@sapphire/framework';

import type { EternityCommand } from './EternityCommand';

export interface EternityArgumentContext extends ArgumentContext {
  command: EternityCommand;
}

export abstract class EternityArgument extends Argument {}
