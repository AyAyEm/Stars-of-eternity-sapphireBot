import _ from 'lodash';
import { createClassDecorator, createMethodDecorator, createProxy } from '@sapphire/decorators';

import type { Ctor } from '@sapphire/utilities';
import type { PagedEmbedOptions, PagedEmbed, IPage } from '#structures/PagedEmbed';

type Target = Ctor<ConstructorParameters<typeof PagedEmbed>>;

const pagedEmbedPages = new WeakMap<Target, IPage[]>();

export function InitPagedEmbed<T extends PagedEmbedOptions>(options: T = {} as T) {
  return createClassDecorator((target: Target) => {
    const toAddPages = options.pages ?? [];

    return createProxy(target, {
      construct: (Constructor, [context, baseOptions = {}]) => {
        const storedPages = pagedEmbedPages.get(Constructor) ?? [];
        const pages = _.unionBy<IPage>([...storedPages, ...toAddPages, ...(baseOptions.pages ?? [])], 'name');

        const obj = new Constructor(context, {
          ...baseOptions,
          ...options,
          pages,
        });
        if (target.prototype) Object.setPrototypeOf(obj, target.prototype);

        return obj;
      },
    });
  });
}

export function Page(pageOptions: Omit<IPage, 'name'>) {
  return createMethodDecorator((target, pageName: string) => {
    const ctor = target.constructor as Target;

    const storedPages = pagedEmbedPages.get(ctor) ?? [] as IPage[];
    const pages = _.unionBy<IPage>([{ name: pageName, ...pageOptions }, ...storedPages], 'name');
    pagedEmbedPages.set(ctor, pages);
  });
}
