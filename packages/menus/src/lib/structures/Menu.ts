import {
	createPartitionedMessageRow,
	isAnyInteraction,
	isMessageButtonInteraction,
	isMessageInstance,
	NonModalInteraction,
	PaginatedMessage,
	PaginatedMessageOptions
} from '@sapphire/discord.js-utilities';
import { Message, MessageButton, MessageOptions, MessageSelectMenu, User, WebhookEditMessageOptions } from 'discord.js';
import { isFunction } from '../util/isFunction';
import { MenuPageBuilder } from './MenuPageBuilder';
import { MenuPagesBuilder } from './MenuPagesBuilder';

export class Menu extends PaginatedMessage {
	public constructor(options: MenuOptions = {}) {
		super(options);
	}

	public setHomeMenuPage(page: MenuPageBuilder | ((page: MenuPageBuilder) => MenuPageBuilder)) {
		const resolvedPage = this.resolveMenuPageBuilder(page).build();
		this.pages.length === 0 //
			? this.addPage(resolvedPage)
			: this.pages.unshift(resolvedPage);
		return this;
	}

	public addMenuPage(page: MenuPageBuilder | ((page: MenuPageBuilder) => MenuPageBuilder)): this {
		const resolvedPage = this.resolveMenuPageBuilder(page).build();
		this.addPage(resolvedPage);
		return this;
	}

	public setMenuPages(pages: MenuPageBuilder[] | MenuPagesBuilder): this {
		const resolvedPages = pages instanceof MenuPagesBuilder ? pages.build() : pages.map((page) => page.build());
		this.setPages(resolvedPages);
		return this;
	}

	public async updateMenuPage(index: number, page: MenuPageBuilder | ((page: MenuPageBuilder) => MenuPageBuilder)): Promise<void> {
		this.pages[index] = this.resolveMenuPageBuilder(page).build();
		this.messages[index] = await this.handlePageLoad(this.pages[index], index);
	}

	protected override async setUpMessage(messageOrInteraction: Message | NonModalInteraction, targetUser: User): Promise<void> {
		let page = this.messages[this.index]!;

		page = isFunction(page) ? await page(this.index, this.pages, this) : page;

		page = { ...page, ...(this.paginatedMessageData ?? {}) };

		if (this.pages.length > 1) {
			const messageComponents = await Promise.all(
				[...this.actions.values()].map<Promise<MessageButton | MessageSelectMenu>>(async (interaction) => {
					return isMessageButtonInteraction(interaction)
						? new MessageButton(interaction)
						: new MessageSelectMenu({
								options: await Promise.all(
									this.pages.map(async (_, index) => {
										return {
											...(await this.selectMenuOptions(
												index + 1,
												this.resolvePaginatedMessageInternationalizationContext(messageOrInteraction, targetUser)
											)),
											value: index.toString()
										};
									})
								),
								placeholder: this.selectMenuPlaceholder,
								...interaction
						  });
				})
			);

			const defaultActions = createPartitionedMessageRow(messageComponents);
			if (!page.components) page.components = [];
			page.components.unshift(...defaultActions);
		}

		if (this.response) {
			if (isAnyInteraction(this.response)) {
				if (this.response.replied || this.response.deferred) {
					await this.response.editReply(page as WebhookEditMessageOptions);
				} else {
					await this.response.reply(page as WebhookEditMessageOptions);
				}
			} else if (isMessageInstance(this.response)) {
				await this.response.edit(page as WebhookEditMessageOptions);
			}
		} else if (isAnyInteraction(messageOrInteraction)) {
			if (messageOrInteraction.replied || messageOrInteraction.deferred) {
				const editReplyResponse = await messageOrInteraction.editReply(page);
				this.response = messageOrInteraction.ephemeral ? messageOrInteraction : editReplyResponse;
			} else {
				this.response = await messageOrInteraction.reply({ ...page, fetchReply: true, ephemeral: false });
			}
		} else {
			this.response = await messageOrInteraction.channel.send(page as MessageOptions);
		}
	}

	private resolveMenuPageBuilder(input: any): MenuPageBuilder {
		return isFunction(input) ? input(new MenuPageBuilder()) : input;
	}
}

export interface MenuOptions extends PaginatedMessageOptions {}

export namespace Menu {
	export type Options = MenuOptions;
}
