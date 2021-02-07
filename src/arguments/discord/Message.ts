import { Argument, ArgumentContext, PieceContext } from '@sapphire/framework';

import type { EternityMessage } from '@lib';

export class Message extends Argument<EternityMessage> {
  public constructor(context: PieceContext) {
    super(context, { name: 'message' });
  }

  public async run(parameter: string, context: ArgumentContext) {
    const message = await context.message.channel.messages.fetch(parameter) as EternityMessage;
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
