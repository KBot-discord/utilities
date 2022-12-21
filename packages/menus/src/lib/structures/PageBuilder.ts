import type { MessageActionRow, MessageEmbed } from 'discord.js';
import type { Page } from '../types';

export class PageBuilder {
	private readonly page: Page;

	public constructor(page?: Page) {
		this.page = page ?? { embeds: [], rows: [] };
	}

	public addEmbed(embed: MessageEmbed) {
		this.page.embeds.push(embed);
		return this;
	}

	public setEmbeds(embeds: MessageEmbed[]) {
		this.page.embeds = embeds;
		return this;
	}

	public addComponentRow(row: MessageActionRow) {
		this.page.rows.push(row);
		return this;
	}

	public setComponentRows(rows: MessageActionRow[]) {
		this.page.rows = rows;
		return this;
	}

	public build() {
		return this.page;
	}
}
