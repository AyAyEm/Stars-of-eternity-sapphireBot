import type { Item } from 'warframe-items';
import { PagedEmbed } from "../../../structures";
import type { PagedEmbedContext, PagedEmbedOptions } from "../../../structures";
export interface BaseItemPagedEmbedContext extends PagedEmbedContext {
    item: Item;
}
export declare class BaseItemPagedEmbed extends PagedEmbed {
    item: Item;
    protected t: <O extends import("@sapphire/utilities").NonNullObject>(key: string, formatOptions?: O) => Promise<string>;
    constructor(context: BaseItemPagedEmbedContext, options?: PagedEmbedOptions);
}
