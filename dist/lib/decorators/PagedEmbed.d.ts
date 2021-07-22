import type { PagedEmbedOptions, IPage } from "../structures/PagedEmbed";
export declare function InitPagedEmbed<T extends PagedEmbedOptions>(options?: T): ClassDecorator;
export declare function Page(pageOptions: Omit<IPage, 'name'>): MethodDecorator;
