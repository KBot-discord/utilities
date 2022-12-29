import { describe, test, expect } from 'vitest';
import { MenuPageBuilder, MenuPagesBuilder } from '../../../src';

describe('PagesBuilder', () => {
	describe('Constructor', () => {
		test('GIVEN default page builder -> RETURN empty page', () => {
			const pageBuilder = new MenuPagesBuilder();

			expect(pageBuilder.build()).toStrictEqual([]);
		});
	});

	describe('Builder methods', () => {
		test('GIVEN pages builder with page -> RETURN pages', () => {
			const pages = new MenuPagesBuilder();
			const page = new MenuPageBuilder();

			pages.addPage(page);
			const builtPages = pages.build();

			expect(builtPages.length).toBe(1);
			expect(builtPages).toStrictEqual([page.build()]);
		});

		test('GIVEN pages builder with pages -> RETURN pages', () => {
			const pages = new MenuPagesBuilder();
			const page = new MenuPageBuilder();

			pages.setPages([page, page]);
			const builtPages = pages.build();

			expect(builtPages.length).toBe(2);
			expect(builtPages).toStrictEqual([page.build(), page.build()]);
		});
	});
});
