import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import type { Page } from '../../src';

export const mockEmptyData: Page = { embeds: [], rows: [] };

export const mockEmbed = new MessageEmbed().setAuthor({ name: 'test' });
export const mockRow = new MessageActionRow().addComponents(new MessageButton());

export const mockEmbedData: Page = {
	embeds: [mockEmbed],
	rows: []
};

export const mockEmbedsData: Page = {
	embeds: [mockEmbed, mockEmbed, mockEmbed],
	rows: []
};

export const mockRowData: Page = {
	embeds: [],
	rows: [mockRow]
};

export const mockRowsData: Page = {
	embeds: [],
	rows: [mockRow, mockRow, mockRow]
};

export const mockData: Page = {
	embeds: mockEmbedData.embeds,
	rows: mockRowData.rows
};
