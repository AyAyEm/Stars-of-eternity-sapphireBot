import { Argument, ArgumentContext, PieceContext } from '@sapphire/framework';
import { Message as DiscordMessage } from 'discord.js';
export declare class Message extends Argument<DiscordMessage> {
    constructor(context: PieceContext);
    run(parameter: string, context: ArgumentContext): Promise<import("@sapphire/framework").Result<DiscordMessage<boolean>, import("@sapphire/framework").UserError>>;
}
