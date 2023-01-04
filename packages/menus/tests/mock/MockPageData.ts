import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import type { MenuPage } from '../../src';

export const mockEmptyData: MenuPage = { embeds: [], components: [] };

export const mockEmbed: MessageEmbed = new MessageEmbed().setAuthor({ name: 'test' });
export const mockRow: MessageActionRow = new MessageActionRow().setComponents([
	new MessageButton({ customId: '1', style: 'PRIMARY'}),
	new MessageButton({ customId: '2', style: 'PRIMARY'}),
	new MessageButton({ customId: '3', style: 'PRIMARY'})
])

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
