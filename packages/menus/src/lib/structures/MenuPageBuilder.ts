import { MessageActionRow, MessageEmbed } from 'discord.js';
import type { MenuPage } from '../types/MenuPageTypes';

export class MenuPageBuilder {
	private page: MenuPage;

	public constructor(page?: MenuPage) {
		this.page = page ?? { embeds: [], components: [] };
	}

	public addEmbed(embed: MessageEmbed | ((embed: MessageEmbed) => MessageEmbed)): this {
		if (!this.page.embeds) this.page.embeds = [];
		this.page.embeds.push(typeof embed === 'function' ? embed(new MessageEmbed()) : embed);
		return this;
	}

	public setEmbeds(
		embeds:
			| MessageEmbed[]
			| ((
					embed1: MessageEmbed,
					embed2: MessageEmbed,
					embed3: MessageEmbed,
					embed4: MessageEmbed,
					embed5: MessageEmbed,
					embed6: MessageEmbed,
					embed7: MessageEmbed,
					embed8: MessageEmbed,
					embed9: MessageEmbed,
					embed10: MessageEmbed
			  ) => MessageEmbed[])
	): this {
		this.page.embeds =
			typeof embeds === 'function'
				? embeds(
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed(),
						new MessageEmbed()
				  )
				: embeds;
		return this;
	}

	public addComponentRow(row: MessageActionRow | ((row: MessageActionRow) => MessageActionRow)): this {
		this.page.components.push(typeof row === 'function' ? row(new MessageActionRow()) : row);
		return this;
	}

	public setComponentRows(
		rows: MessageActionRow[] | ((row1: MessageActionRow, row2: MessageActionRow, row3: MessageActionRow) => MessageActionRow[])
	): this {
		this.page.components = [];
		const newRows = typeof rows === 'function' ? rows(new MessageActionRow(), new MessageActionRow(), new MessageActionRow()) : rows;
		for (const row of newRows) this.addComponentRow(row);
		return this;
	}

	public build(): MenuPage {
		return this.page;
	}
}
