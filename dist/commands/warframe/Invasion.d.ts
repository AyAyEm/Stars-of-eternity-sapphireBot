import { Target } from '@sapphire/plugin-i18next';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';
import type { Args } from '@sapphire/framework';
import type { Item as WarframeItem } from 'warframe-items';
import { EternityMessageEmbed } from "../../lib";
import { CaseInsensitiveMap } from "../../lib/structures/CaseInsensitiveMap";
export default class extends SubCommandPluginCommand {
    possibleItemsEmbed(target: Target): Promise<EternityMessageEmbed>;
    itemsDict: CaseInsensitiveMap<string, WarframeItem>;
    items(msg: Message, args: Args): Promise<void>;
    disable(msg: Message): Promise<void>;
    enable(msg: Message): Promise<void>;
    private setEnabled;
    add(msg: Message, args: Args): Promise<void>;
    delete(msg: Message, args: Args): Promise<void>;
    private updateItems;
}
