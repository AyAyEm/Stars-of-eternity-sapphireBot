import { Argument, ArgumentContext, PieceContext } from '@sapphire/framework';
import type { EternityMessage } from '@lib';
export declare class Message extends Argument<EternityMessage> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): Promise<import("@sapphire/framework").Result<EternityMessage, import("@sapphire/framework").UserError>>;
}
