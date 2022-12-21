import { NonModalInteraction, PaginatedMessage, PaginatedMessageOptions } from '@sapphire/discord.js-utilities';
import { Message, MessageEmbed, User } from 'discord.js';
import { buildKey } from '../util/CustomIds';

export class Menu {
	private readonly paginatedMessage;

	protected constructor(options: MenuOptions) {
		this.paginatedMessage = new PaginatedMessage(options);
	}

	public setHomePage(embed: MessageEmbed | ((embed: MessageEmbed) => MessageEmbed)) {
		const { pages } = this.paginatedMessage;
		const page = { embeds: typeof embed === 'function' ? [embed(new MessageEmbed())] : [embed] };
		pages.length === 0 //
			? pages.push(page)
			: pages.unshift(page);
		return this;
	}

	public createCustomId<T>(prefix: string, params: T | never) {
		return buildKey<T>(prefix, params);
	}

	public run(messageOrInteraction: Message | NonModalInteraction, target?: User) {
		return this.paginatedMessage.run(messageOrInteraction, target);
	}
}

export interface Menus {
	Test: { test: string };
}

export interface MenuOptions extends PaginatedMessageOptions {}

export namespace Menu {
	export type Options = MenuOptions;
}
