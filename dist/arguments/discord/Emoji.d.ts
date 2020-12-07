import { Argument, ArgumentContext, PieceContext } from '@sapphire/framework';
import { Emoji as DiscordEmoji } from 'discord.js';
export declare class Emoji extends Argument<DiscordEmoji> {
    constructor(context: PieceContext);
    unicodeEmojiRegex: RegExp;
    run(argument: string, context: ArgumentContext): Promise<import("@sapphire/framework").Result<DiscordEmoji, import("@sapphire/framework").UserError>>;
}
