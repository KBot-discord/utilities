import { ActionRowBuilder, EmbedBuilder } from 'discord.js';
import type { MenuPage, MenuPageRowUnion } from '../types/MenuPageTypes';

export class MenuPageBuilder {
	private page: MenuPage;

	public constructor(page?: MenuPage) {
		this.page = page ?? { embeds: [], components: [] };
	}

	public addEmbed(embed: EmbedBuilder | ((embed: EmbedBuilder) => EmbedBuilder)): this {
		if (!this.page.embeds) this.page.embeds = [];
		this.page.embeds.push(typeof embed === 'function' ? embed(new EmbedBuilder()) : embed);
		return this;
	}

	public setEmbeds(
		embeds:
			| EmbedBuilder[]
			| ((
					embed1: EmbedBuilder,
					embed2: EmbedBuilder,
					embed3: EmbedBuilder,
					embed4: EmbedBuilder,
					embed5: EmbedBuilder,
					embed6: EmbedBuilder,
					embed7: EmbedBuilder,
					embed8: EmbedBuilder,
					embed9: EmbedBuilder,
					embed10: EmbedBuilder
			  ) => EmbedBuilder[])
	): this {
		this.page.embeds =
			typeof embeds === 'function'
				? embeds(
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder(),
						new EmbedBuilder()
				  )
				: embeds;
		return this;
	}

	public addComponentRow(
		row: ActionRowBuilder<MenuPageRowUnion> | ((row: ActionRowBuilder<MenuPageRowUnion>) => ActionRowBuilder<MenuPageRowUnion>)
	): this {
		this.page.components.push(typeof row === 'function' ? row(new ActionRowBuilder<MenuPageRowUnion>()) : row);
		return this;
	}

	public setComponentRows(
		rows:
			| ActionRowBuilder<MenuPageRowUnion>[]
			| ((
					row1: ActionRowBuilder<MenuPageRowUnion>,
					row2: ActionRowBuilder<MenuPageRowUnion>,
					row3: ActionRowBuilder<MenuPageRowUnion>
			  ) => ActionRowBuilder<MenuPageRowUnion>[])
	): this {
		this.page.components = [];
		const newRows =
			typeof rows === 'function'
				? rows(new ActionRowBuilder<MenuPageRowUnion>(), new ActionRowBuilder<MenuPageRowUnion>(), new ActionRowBuilder<MenuPageRowUnion>())
				: rows;
		for (const row of newRows) this.addComponentRow(row);
		return this;
	}

	public build(): MenuPage {
		return this.page;
	}
}
