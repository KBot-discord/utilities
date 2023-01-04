import { describe, test, expect } from 'vitest';
import { MenuPageBuilder } from '../../../src';
import { mockEmptyData, mockEmbedData, mockEmbedsData, mockRowData, mockRowsData, mockData, mockRow } from '../../mock/MockPageData';

describe('PageBuilder', () => {
	describe('Constructor', () => {
		test('GIVEN default page builder -> RETURN empty page', () => {
			const page = new MenuPageBuilder();

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockEmptyData);
		});
	});

	describe('Builder methods', () => {
		test('GIVEN page builder with embed -> RETURN page with embed', () => {
			const page = new MenuPageBuilder() //
				.addEmbed((embed) => embed.setAuthor({ name: 'test' }));

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockEmbedData);
		});

		test('GIVEN page builder with embeds -> RETURN page with embeds', () => {
			const page = new MenuPageBuilder() //
				.setEmbeds((embed1, embed2, embed3) => {
					return [embed1.setAuthor({ name: 'test' }), embed2.setAuthor({ name: 'test' }), embed3.setAuthor({ name: 'test' })];
				});

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockEmbedsData);
		});

		test('GIVEN page builder with rows -> RETURN page with rows', () => {
			const page = new MenuPageBuilder() //
				.addComponentRow(mockRow);

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockRowData);
		});

		test('GIVEN page builder with rows -> RETURN page with rows', () => {
			const page = new MenuPageBuilder() //
				.setComponentRows([mockRow, mockRow, mockRow]);

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockRowsData);
		});
	});

	describe('Constructor with data', () => {
		test('GIVEN builder with existing empty page -> RETURN page with empty page', () => {
			const page = new MenuPageBuilder(mockEmptyData);

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockEmptyData);
		});

		test('GIVEN builder with existing page with embeds -> RETURN page with embeds', () => {
			const page = new MenuPageBuilder(mockEmbedData);

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockEmbedData);
		});

		test('GIVEN builder with existing page with rows -> RETURN page with rows', () => {
			const page = new MenuPageBuilder(mockRowData);

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockRowData);
		});

		test('GIVEN builder with existing page with embeds and rows -> RETURN page with embeds and rows', () => {
			const page = new MenuPageBuilder(mockData);

			expect(page).toBeInstanceOf(MenuPageBuilder);
			expect(page.build()).toStrictEqual(mockData);
		});
	});
});
