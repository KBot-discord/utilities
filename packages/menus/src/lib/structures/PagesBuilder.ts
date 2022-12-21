import { PageBuilder } from './PageBuilder';
import type { Page, PageResolvable } from '../types';

export class PagesBuilder {
	private pages: Page[];

	public constructor(pages?: PageResolvable[]) {
		this.pages = pages ? pages.map((page) => this.resolvePage(page)) : [];
	}

	public addPage(page: PageResolvable) {
		const resolvedPage = this.resolvePage(page);
		this.pages.push(resolvedPage);
		return this;
	}

	public setPages(pages: PageResolvable[]) {
		this.pages = pages.map((page) => this.resolvePage(page));
		return this;
	}

	public build() {
		return this.pages;
	}

	private resolvePage(unknownPage: PageResolvable) {
		return unknownPage instanceof PageBuilder ? unknownPage.build() : unknownPage;
	}
}
