import { describe, test, expect } from 'vitest';
import { Menu, PageBuilder, PagesBuilder } from '../../../src';

describe('Menu', () => {
	describe('Constructor', () => {
		test('GIVEN default menu -> RETURN PaginatedMessage', () => {
			const menu = new Menu();

			expect(menu.paginatedMessage.pages.length).toBe(0);
		});
	});

	describe('Methods', () => {
		test('GIVEN menu with home page -> RETURN PaginatedMessage with 1 page', () => {
			const page = new PageBuilder();
			const menu = new Menu();

			menu.setHomePage(page);

			expect(menu.paginatedMessage.pages.length).toBe(1);
		});

		test('GIVEN menu with home page -> RETURN PaginatedMessage with 1 page', () => {
			const page = new PageBuilder();
			const menu = new Menu();

			menu.addPage(page);

			expect(menu.paginatedMessage.pages.length).toBe(1);
		});

		test('GIVEN menu with 2 pages -> RETURN PaginatedMessage with 2 pages', () => {
			const page = new PageBuilder();
			const menu = new Menu();

			menu.setPages([page, page]);

			expect(menu.paginatedMessage.pages.length).toBe(2);
		});

		test('GIVEN menu with 2 pages -> RETURN PaginatedMessage with 2 pages', () => {
			const page = new PageBuilder();
			const pages = new PagesBuilder().setPages([page, page]);
			const menu = new Menu();

			menu.setPages(pages);

			expect(menu.paginatedMessage.pages.length).toBe(2);
		});

		test('GIVEN menu with 2 pages THEN remove 2 pages -> RETURN PaginatedMessage with 0 pages', () => {
			const pages = new PagesBuilder();
			const menu = new Menu();

			menu.setPages(pages);
			menu.setPages([]);

			expect(menu.paginatedMessage.pages.length).toBe(0);
		});
	});
});
