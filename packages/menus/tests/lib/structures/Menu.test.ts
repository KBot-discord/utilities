import { describe, test, expect } from 'vitest';
import { Menu, MenuPageBuilder, MenuPagesBuilder } from '../../../src';

describe('Menu', () => {
	describe('Constructor', () => {
		test('GIVEN default menu -> RETURN PaginatedMessage', () => {
			const menu = new Menu();

			expect(menu.pages.length).toBe(0);
		});
	});

	describe('Methods', () => {
		test('GIVEN menu with home page -> RETURN PaginatedMessage with 1 page', () => {
			const page = new MenuPageBuilder();
			const menu = new Menu();

			menu.setHomeMenuPage(page);

			expect(menu.pages.length).toBe(1);
		});

		test('GIVEN menu with 2 pages -> RETURN PaginatedMessage with 2 pages', () => {
			const page = new MenuPageBuilder();
			const menu = new Menu();

			menu.setMenuPages([page, page]);

			expect(menu.pages.length).toBe(2);
		});

		test('GIVEN menu with 2 pages -> RETURN PaginatedMessage with 2 pages', () => {
			const page = new MenuPageBuilder();
			const pages = new MenuPagesBuilder().setPages([page, page]);
			const menu = new Menu();

			menu.setMenuPages(pages);

			expect(menu.pages.length).toBe(2);
		});

		test('GIVEN menu with 2 pages THEN remove 2 pages -> RETURN PaginatedMessage with 0 pages', () => {
			const pages = new MenuPagesBuilder();
			const menu = new Menu();

			menu.setMenuPages(pages);
			menu.setMenuPages([]);

			expect(menu.pages.length).toBe(0);
		});
	});
});
