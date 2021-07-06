import { MessageEmbed } from 'discord.js';
import { inspect } from 'util';

import { EternityCommand, EternityMessage } from '@lib';
import { CommandOptions, Args } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
  preconditions: ['OwnerOnly'],
})
export default class extends EternityCommand {
  public async run(msg: EternityMessage, args: Args) {
    const embed = new MessageEmbed()
      .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

    const query = await args.rest('string');

    const code = (lang: string, c) => (`\`\`\`${lang}\n${String(c).slice(0, 1000) + (c.length >= 1000 ? '...' : '')}\n\`\`\``).replace(this.client.token, '*'.repeat(this.client.token.length));

    if (!query) msg.channel.send('Please, write something so I can evaluate!');
    else {
      try {
        // eslint-disable-next-line no-eval
        const evald = eval(query);
        const res = typeof evald === 'string' ? evald : inspect(evald, { depth: 0 });

        embed.addField('Result', code('js', res));

        if (!res || (!evald && evald !== 0)) embed.setColor('RED');
        else {
          embed
            .addField('Type', code('css', typeof evald))
            .setColor('GREEN');
        }
      } catch (error) {
        embed
          .addField('Error', code('js', error))
          .setColor('RED');
      } finally {
        msg.channel.send(embed).catch((error) => {
          msg.channel.send(`There was an error while displaying the eval result! ${error.message}`);
        });
      }
    }
  }
}
