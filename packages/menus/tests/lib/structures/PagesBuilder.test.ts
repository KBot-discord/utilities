import { describe, test, expect } from 'vitest';
import { PageBuilder, PagesBuilder } from '../../../src';

describe('PagesBuilder', () => {
	describe('Constructor', () => {
		test('GIVEN default page builder -> RETURN empty page', () => {
			const pageBuilder = new PagesBuilder();

			expect(pageBuilder.build()).toStrictEqual([]);
		});
	});

	describe('Builder methods', () => {
		test('GIVEN pages builder with page -> RETURN pages', () => {
			const pages = new PagesBuilder();
			const page = new PageBuilder();

			pages.addPage(page);
			const builtPages = pages.build();

			expect(builtPages.length).toBe(1);
			expect(builtPages).toStrictEqual([page.build()]);
		});

		test('GIVEN pages builder with pages -> RETURN pages', () => {
			const pages = new PagesBuilder();
			const page = new PageBuilder();

			pages.setPages([page, page]);
			const builtPages = pages.build();

			expect(builtPages.length).toBe(2);
			expect(builtPages).toStrictEqual([page.build(), page.build()]);
		});
	});
});
