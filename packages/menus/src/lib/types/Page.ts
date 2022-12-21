import type { MessageActionRow, MessageEmbed } from 'discord.js';
import type { PageBuilder } from '../structures/PageBuilder';
import type { PagesBuilder } from '../structures/PagesBuilder';

export interface Page {
	embeds: MessageEmbed[];
	rows: MessageActionRow[];
}

export type PageResolvable = PageBuilder | Page;

export type PagesResolvable = PageResolvable[] | PageBuilder[] | Page[] | PagesBuilder;
