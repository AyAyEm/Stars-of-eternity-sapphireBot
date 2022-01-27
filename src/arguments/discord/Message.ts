import { Argument, ArgumentContext, PieceContext } from '@sapphire/framework';
import { Message as DiscordMessage } from 'discord.js';

export class Message extends Argument<DiscordMessage> {
  public constructor(context: PieceContext) {
    super(context, { name: 'message' });
  }

  public async run(parameter: string, context: ArgumentContext) {
    const message = await context.message.channel.messages.fetch(parameter);
    if (!message) {
      return this.error({
        parameter,
        identifier: 'ArgumentInvalidMessage',
        message: 'Argument passed cannot resolve to a valid message in this channel',
      });
    }

    return this.ok(message);
  }
}
