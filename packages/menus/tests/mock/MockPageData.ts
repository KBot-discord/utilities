import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import type { MenuPage, MenuPageRowUnion } from '../../src';

export const mockEmptyData: MenuPage = { embeds: [], components: [] };

export const mockEmbed: EmbedBuilder = new EmbedBuilder().setAuthor({ name: 'test' });
export const mockRow: ActionRowBuilder<MenuPageRowUnion> = new ActionRowBuilder<MenuPageRowUnion>().setComponents([
	new ButtonBuilder({ customId: '1', style: ButtonStyle.Primary }),
	new ButtonBuilder({ customId: '2', style: ButtonStyle.Primary }),
	new ButtonBuilder({ customId: '3', style: ButtonStyle.Primary })
]);

export const mockEmbedData: MenuPage = {
	embeds: [mockEmbed],
	components: []
};

export const mockEmbedsData: MenuPage = {
	embeds: [mockEmbed, mockEmbed, mockEmbed],
	components: []
};

export const mockRowData: MenuPage = {
	embeds: [],
	components: [mockRow]
};

export const mockRowsData: MenuPage = {
	embeds: [],
	components: [mockRow, mockRow, mockRow]
};

export const mockData: MenuPage = {
	embeds: mockEmbedData.embeds,
	components: mockRowData.components
};
