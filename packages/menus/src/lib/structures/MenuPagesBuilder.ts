import { MenuPageBuilder } from './MenuPageBuilder';
import type { MenuPage, MenuPageResolvable } from '../types/MenuPageTypes';

export class MenuPagesBuilder {
	private pages: MenuPage[];

	public constructor(pages?: MenuPageResolvable[]) {
		this.pages = pages ? pages.map((page) => this.resolvePage(page)) : [];
	}

	public addPage(page: MenuPageResolvable): this {
		const resolvedPage = this.resolvePage(page);
		this.pages.push(resolvedPage);
		return this;
	}

	public setPages(pages: MenuPageResolvable[]): this {
		this.pages = [];
		for (const page of pages) this.addPage(page);
		return this;
	}

	public build(): MenuPage[] {
		return this.pages;
	}

	private resolvePage(unknownPage: MenuPageResolvable) {
		return unknownPage instanceof MenuPageBuilder ? unknownPage.build() : unknownPage;
	}
}
