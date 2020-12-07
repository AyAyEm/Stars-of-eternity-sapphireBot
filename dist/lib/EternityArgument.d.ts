import { Argument, ArgumentContext } from '@sapphire/framework';
import { EternityClient } from './EternityClient';
import type { EternityCommand } from './EternityCommand';
export interface EternityArgumentContext extends ArgumentContext {
    command: EternityCommand;
}
export declare abstract class EternityArgument extends Argument {
    get client(): EternityClient;
}
