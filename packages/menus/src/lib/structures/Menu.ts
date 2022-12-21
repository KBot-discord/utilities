import { NonModalInteraction, PaginatedMessage, PaginatedMessageOptions } from '@sapphire/discord.js-utilities';
import { isFunction } from '../util/isFunction';
import { PageBuilder } from './PageBuilder';
import { PagesBuilder } from './PagesBuilder';
import type { Message, User } from 'discord.js';

export class Menu {
	public readonly paginatedMessage;

	public constructor(options?: MenuOptions) {
		this.paginatedMessage = new PaginatedMessage(options);
	}

	public setHomePage(page: PageBuilder | ((page: PageBuilder) => PageBuilder)) {
		const { pages } = this.paginatedMessage;
		const resolvedPage = this.resolvePage(page).build();
		pages.length === 0 //
			? pages.push(resolvedPage)
			: pages.unshift(resolvedPage);
		return this;
	}

	public addPage(page: PageBuilder | ((page: PageBuilder) => PageBuilder)): this {
		const resolvedPage = this.resolvePage(page).build();
		this.paginatedMessage.addPage(resolvedPage);
		return this;
	}

	public setPages(pages: PageBuilder[] | PagesBuilder): this {
		const resolvedPages = pages instanceof PagesBuilder ? pages.build() : pages.map((page) => page.build());
		this.paginatedMessage.setPages(resolvedPages);
		return this;
	}

	public run(messageOrInteraction: Message | NonModalInteraction, target?: User): Promise<PaginatedMessage> {
		return this.paginatedMessage.run(messageOrInteraction, target);
	}

	private resolvePage(input: any): PageBuilder {
		return isFunction(input) ? input(new PageBuilder()) : input;
	}
}

export interface Menus {}

export interface MenuOptions extends PaginatedMessageOptions {}

export namespace Menu {
	export type Options = MenuOptions;
}
