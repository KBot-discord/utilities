import { describe, test, expect } from 'vitest';
import { MessageButton } from 'discord.js';
import { PageBuilder } from '../../../src';
import { mockEmptyData, mockEmbedData, mockEmbedsData, mockRowData, mockRowsData, mockData } from '../../mock/MockPageData';

describe('PageBuilder', () => {
	describe('Constructor', () => {
		test('GIVEN default page builder -> RETURN empty page', () => {
			const page = new PageBuilder();

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockEmptyData);
		});
	});

	describe('Builder methods', () => {
		test('GIVEN page builder with embed -> RETURN page with embed', () => {
			const page = new PageBuilder() //
				.addEmbed((embed) => embed.setAuthor({ name: 'test' }));

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockEmbedData);
		});

		test('GIVEN page builder with embeds -> RETURN page with embeds', () => {
			const page = new PageBuilder() //
				.setEmbeds((embed1, embed2, embed3) => {
					return [embed1.setAuthor({ name: 'test' }), embed2.setAuthor({ name: 'test' }), embed3.setAuthor({ name: 'test' })];
				});

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockEmbedsData);
		});

		test('GIVEN page builder with row -> RETURN page with row', () => {
			const page = new PageBuilder() //
				.addComponentRow((row) => row.addComponents(new MessageButton()));

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockRowData);
		});

		test('GIVEN page builder with rows -> RETURN page with rows', () => {
			const page = new PageBuilder() //
				.setComponentRows((row1, row2, row3) => {
					return [
						row1.addComponents(new MessageButton()),
						row2.addComponents(new MessageButton()),
						row3.addComponents(new MessageButton())
					];
				});

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockRowsData);
		});
	});

	describe('Constructor with data', () => {
		test('GIVEN builder with existing empty page -> RETURN page with empty page', () => {
			const page = new PageBuilder(mockEmptyData);

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockEmptyData);
		});

		test('GIVEN builder with existing page with embeds -> RETURN page with embeds', () => {
			const page = new PageBuilder(mockEmbedData);

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockEmbedData);
		});

		test('GIVEN builder with existing page with rows -> RETURN page with rows', () => {
			const page = new PageBuilder(mockRowData);

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockRowData);
		});

		test('GIVEN builder with existing page with embeds and rows -> RETURN page with embeds and rows', () => {
			const page = new PageBuilder(mockData);

			expect(page).toBeInstanceOf(PageBuilder);
			expect(page.build()).toStrictEqual(mockData);
		});
	});
});
