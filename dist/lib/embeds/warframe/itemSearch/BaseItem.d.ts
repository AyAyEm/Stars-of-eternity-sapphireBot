import type { Item } from 'warframe-items';
import { PagedEmbed } from "../../../structures";
import type { PagedEmbedContext, PagedEmbedOptions } from "../../../structures";
export interface BaseItemPagedEmbedContext extends PagedEmbedContext {
    item: Item;
}
export declare class BaseItemPagedEmbed extends PagedEmbed {
    item: Item;
    protected t: {
        (key: string, defaultValue: string, options?: import("i18next").TOptions<import("i18next").StringMap> | import("i18next").TOptions<import("i18next").StringMap>[]): string;
        (key: string, options?: import("i18next").TOptions<import("i18next").StringMap> | import("i18next").TOptions<import("i18next").StringMap>[]): string;
    };
    constructor(context: BaseItemPagedEmbedContext, options?: PagedEmbedOptions);
}
