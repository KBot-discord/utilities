import {
	type AnyInteractableInteraction,
	isAnyInteraction,
	isMessageInstance,
	isGuildBasedChannel,
	safelyReplyToInteraction
} from '@sapphire/discord.js-utilities';
import {
	type SelectMenuComponentOptionData,
	ActionRowBuilder,
	ButtonBuilder,
	StringSelectMenuBuilder,
	ButtonStyle,
	ComponentType,
	type User,
	userMention,
	type APIMessage,
	type Message,
	InteractionCollector,
	type ButtonInteraction,
	type StringSelectMenuInteraction,
	type WebhookMessageEditOptions,
	type InteractionReplyOptions,
	type BaseMessageOptions,
	type TextBasedChannel,
	InteractionType,
	type Collection,
	type Snowflake
} from 'discord.js';
import type {
	MenuPageRowUnion,
	MenuArrowFunction,
	MenuSelectMenuOptionsFunction,
	MenuWrongUserInteractionReplyFunction,
	MenuPage,
	MenuOptions,
	MenuStopReasons
} from '../types/MenuPageTypes';
import { isFunction, isNullOrUndefined, isObject } from '../util';
import { MenuPageBuilder } from './MenuPageBuilder';
import { MenuPagesBuilder } from './MenuPagesBuilder';

export class Menu {
	public static defaultRows(
		options: SelectMenuComponentOptionData[],
		placeholder?: string
	): ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] {
		return [
			new ActionRowBuilder<MenuPageRowUnion>().setComponents([
				new ButtonBuilder({
					customId: '@kbotdev/menus.firstPage',
					style: ButtonStyle.Primary,
					emoji: '⏪',
					type: ComponentType.Button
				}),
				new ButtonBuilder({
					customId: '@kbotdev/menus.previousPage',
					style: ButtonStyle.Primary,
					emoji: '◀️',
					type: ComponentType.Button
				}),
				new ButtonBuilder({
					customId: '@kbotdev/menus.nextPage',
					style: ButtonStyle.Primary,
					emoji: '▶️',
					type: ComponentType.Button
				}),
				new ButtonBuilder({
					customId: '@kbotdev/menus.goToLastPage',
					style: ButtonStyle.Primary,
					emoji: '⏩',
					type: ComponentType.Button
				}),
				new ButtonBuilder({
					customId: '@kbotdev/menus.stop',
					style: ButtonStyle.Danger,
					emoji: '⏹️',
					type: ComponentType.Button
				})
			]),
			new ActionRowBuilder<MenuPageRowUnion>().setComponents([
				new StringSelectMenuBuilder({
					customId: '@kbotdev/menus.goToPage',
					type: ComponentType.StringSelect,
					options,
					placeholder
				})
			])
		];
	}

	public static arrows = new Map<string, MenuArrowFunction>([
		[
			'@kbotdev/menus.goToPage', //
			{ run: ({ handler, interaction }) => interaction.isStringSelectMenu() && (handler.index = parseInt(interaction.values[0], 10)) }
		],
		[
			'@kbotdev/menus.firstPage', //
			{ run: ({ handler }) => (handler.index = 0) }
		],
		[
			'@kbotdev/menus.previousPage', //
			{ run: ({ handler }) => (handler.index === 0 ? (handler.index = handler.pages.length - 1) : --handler.index) }
		],
		[
			'@kbotdev/menus.nextPage', //
			{ run: ({ handler }) => (handler.index === handler.pages.length - 1 ? (handler.index = 0) : ++handler.index) }
		],
		[
			'@kbotdev/menus.goToLastPage', //
			{ run: ({ handler }) => (handler.index = handler.pages.length - 1) }
		],
		[
			'@kbotdev/menus.stop', //
			{ run: ({ collector }) => collector.stop() }
		]
	]);

	public static deletionStopReasons = ['messageDelete', 'channelDelete', 'guildDelete'];

	public static readonly messages = new Map<string, Menu>();

	public static readonly handlers = new Map<string, Menu>();

	public static selectMenuOptions: MenuSelectMenuOptionsFunction = (pageIndex) => ({ label: `Page ${pageIndex}` });

	public static wrongUserInteractionReply: MenuWrongUserInteractionReplyFunction = (targetUser: User) => ({
		content: `This menu is only for ${userMention(targetUser.id)}.`,
		ephemeral: true,
		allowedMentions: { users: [], roles: [] }
	});

	public pages: MenuPage[] = [];

	public rows: ActionRowBuilder<MenuPageRowUnion>[] = [];

	public response: APIMessage | Message | AnyInteractableInteraction | null = null;

	public collector: InteractionCollector<ButtonInteraction | StringSelectMenuInteraction> | null = null;

	public index = 0;

	public idle = 1000 * 60 * 14.5;

	protected selectMenuOptions: MenuSelectMenuOptionsFunction = Menu.selectMenuOptions;

	protected selectMenuPlaceholder: string | undefined = undefined;

	protected wrongUserInteractionReply: MenuWrongUserInteractionReplyFunction = Menu.wrongUserInteractionReply;

	public constructor({ pages, sharedRows }: MenuOptions = {}) {
		this.pages = pages ?? [];
		this.rows = sharedRows ?? [];
	}

	public setSelectMenuOptions(newOptions: MenuSelectMenuOptionsFunction): this {
		this.selectMenuOptions = newOptions;
		return this;
	}

	public setSelectMenuPlaceholder(placeholder: string | undefined): this {
		this.selectMenuPlaceholder = placeholder;
		return this;
	}

	public setSharedRows(rows: ActionRowBuilder<MenuPageRowUnion>[]): this {
		this.rows = [];
		return this.addSharedRows([...rows]);
	}

	public addSharedRows(rows: ActionRowBuilder<MenuPageRowUnion>[]): this {
		for (const row of rows) this.addSharedRow(row);
		return this;
	}

	public addSharedRow(row: ActionRowBuilder<MenuPageRowUnion>): this {
		this.rows.push(row);
		return this;
	}

	public getCurrentPage(): MenuPage {
		return this.pages[this.index];
	}

	public setPages(pages: MenuPageBuilder[] | MenuPagesBuilder) {
		this.pages = [];
		this.addPages(pages);
		return this;
	}

	public addPages(pages: MenuPageBuilder[] | MenuPagesBuilder): this {
		const resolvedPages = pages instanceof MenuPagesBuilder ? pages.build() : pages.map((page) => page.build());
		for (const page of resolvedPages) this.pages.push(page);
		return this;
	}

	public addPage(page: MenuPageBuilder | ((page: MenuPageBuilder) => MenuPageBuilder)): this {
		const resolvedPage = this.resolveMenuPageBuilder(page).build();
		this.pages.push(resolvedPage);
		return this;
	}

	public setHomePage(page: MenuPageBuilder | ((page: MenuPageBuilder) => MenuPageBuilder)) {
		const resolvedBuilder = this.resolveMenuPageBuilder(page);
		if (this.pages.length === 0) {
			this.addPage(resolvedBuilder);
		} else {
			this.pages.unshift(resolvedBuilder.build());
		}
		return this;
	}

	public async updatePage(page: MenuPageBuilder | ((page: MenuPageBuilder) => MenuPageBuilder)) {
		const currentIndex = this.index;

		const builtPage = this.resolveMenuPageBuilder(page).build();

		this.pages[currentIndex] = builtPage;

		const response = this.response as AnyInteractableInteraction;
		return response.editReply(builtPage);
	}

	public resolveMenuPageBuilder(builder: MenuPageBuilder | ((page: MenuPageBuilder) => MenuPageBuilder)): MenuPageBuilder {
		return isFunction(builder) ? builder(new MenuPageBuilder()) : builder;
	}

	public async run(messageOrInteraction: Message | AnyInteractableInteraction, target?: User): Promise<this> {
		target ??= isAnyInteraction(messageOrInteraction) ? messageOrInteraction.user : messageOrInteraction.author;

		const menu = Menu.handlers.get(target.id);

		menu?.collector?.stop();

		if (isAnyInteraction(messageOrInteraction)) {
			if (messageOrInteraction.user.bot && messageOrInteraction.user.id === messageOrInteraction.client.user?.id) {
				this.response = messageOrInteraction;
			}
		} else if (messageOrInteraction.author.bot && messageOrInteraction.author.id === messageOrInteraction.client.user?.id) {
			this.response = messageOrInteraction;
		}

		await this.setUpMessage(messageOrInteraction);
		if (this.pages.length > 1) this.setUpCollector(messageOrInteraction.channel!, target);

		const messageId = this.response!.id;

		if (this.collector) {
			this.collector.once('end', () => {
				Menu.messages.delete(messageId);
				Menu.handlers.delete(target!.id);
			});

			Menu.messages.set(messageId, this);
			Menu.handlers.set(target.id, this);
		}
		return this;
	}

	protected async setUpMessage(messageOrInteraction: Message | AnyInteractableInteraction): Promise<void> {
		if (this.pages.length > 1) {
			const selectMenuOptions = await Promise.all(
				this.pages.map(async (_, index) => {
					return {
						...(await this.selectMenuOptions(index + 1)),
						value: index.toString()
					};
				})
			);

			const defaultRows = Menu.defaultRows(selectMenuOptions, this.selectMenuPlaceholder);

			this.rows.unshift(...defaultRows);
		}

		for (let i = 0; i < this.pages.length; i++) {
			this.pages[i] = this.handlePageLoad(this.pages[i], i);
		}

		const homePage = this.pages[this.index];

		if (this.response) {
			if (isAnyInteraction(this.response)) {
				if (this.response.replied || this.response.deferred) {
					await this.response.editReply(homePage as WebhookMessageEditOptions);
				} else {
					await this.response.reply(homePage as InteractionReplyOptions);
				}
			} else if (isMessageInstance(this.response)) {
				await this.response.edit(homePage as WebhookMessageEditOptions);
			}
		} else if (isAnyInteraction(messageOrInteraction)) {
			if (messageOrInteraction.replied || messageOrInteraction.deferred) {
				const editReplyResponse = await messageOrInteraction.editReply(homePage);
				this.response = messageOrInteraction.ephemeral ? messageOrInteraction : editReplyResponse;
			} else {
				this.response = await messageOrInteraction.reply({ ...homePage, fetchReply: true, ephemeral: false });
			}
		} else {
			this.response = await messageOrInteraction.channel.send(homePage as BaseMessageOptions);
		}
	}

	protected setUpCollector(channel: TextBasedChannel, targetUser: User): void {
		this.collector = new InteractionCollector<ButtonInteraction | StringSelectMenuInteraction>(targetUser.client, {
			filter: (interaction) =>
				!isNullOrUndefined(this.response) && //
				interaction.isMessageComponent() &&
				Menu.arrows.has(interaction.customId),

			time: this.idle,

			guild: isGuildBasedChannel(channel) ? channel.guild : undefined,

			channel,

			interactionType: InteractionType.MessageComponent,

			...(this.response && !isAnyInteraction(this.response)
				? {
						message: this.response
				  }
				: {})
		})
			.on('collect', this.handleCollect.bind(this, targetUser))
			.on('end', this.handleEnd.bind(this));
	}

	protected handlePageLoad(page: MenuPage, index: number): MenuPage {
		const pageWithComponents = this.applyComponents(page);
		return this.applyFooter(pageWithComponents, index);
	}

	protected async handleCollect(targetUser: User, interaction: ButtonInteraction | StringSelectMenuInteraction): Promise<void> {
		if (interaction.user.id === targetUser.id) {
			this.response = interaction;

			const action = Menu.arrows.get(interaction.customId)!;

			const previousIndex = this.index;

			await action.run({
				interaction,
				handler: this,
				collector: this.collector!
			});

			if (interaction.customId !== '@kbotdev/menus.stop') {
				const newIndex = previousIndex === this.index ? previousIndex : this.index;
				const menuPage = this.pages[newIndex];

				await safelyReplyToInteraction({
					messageOrInteraction: interaction,
					interactionEditReplyContent: menuPage,
					interactionReplyContent: { content: 'Something went wrong.', ephemeral: true },
					componentUpdateContent: menuPage
				});
			}
		} else {
			const interactionReplyOptions = await this.wrongUserInteractionReply(targetUser, interaction.user);

			await interaction.reply(
				isObject(interactionReplyOptions)
					? interactionReplyOptions
					: { content: interactionReplyOptions, ephemeral: true, allowedMentions: { users: [], roles: [] } }
			);
		}
	}

	protected async handleEnd(_: Collection<Snowflake, ButtonInteraction | StringSelectMenuInteraction>, reason: MenuStopReasons): Promise<void> {
		if (
			(reason === 'time' || reason === 'idle') &&
			this.response !== null &&
			isAnyInteraction(this.response) &&
			this.response.isMessageComponent()
		) {
			this.response.message = await this.response.fetchReply();
		}

		this.collector?.removeAllListeners();

		if (this.response && !Menu.deletionStopReasons.includes(reason)) {
			void safelyReplyToInteraction({
				messageOrInteraction: this.response,
				interactionEditReplyContent: { components: [] },
				interactionReplyContent: { content: 'Something went wrong.', ephemeral: true },
				componentUpdateContent: { components: [] },
				messageMethod: 'edit',
				messageMethodContent: { components: [] }
			});
		}
	}

	protected applyComponents(page: MenuPage): MenuPage {
		return { ...page, components: [...this.rows, ...page.components] };
	}

	protected applyFooter(page: MenuPage, index: number): MenuPage {
		if (!page.embeds?.length) {
			return page;
		}

		const idx = page.embeds.length - 1;
		const lastEmbed = page.embeds[idx];
		if (lastEmbed) {
			lastEmbed.data.footer ??= { text: '' };
			lastEmbed.data.footer.text = `${index + 1} / ${this.pages.length}`;
		}

		return { ...page, embeds: page.embeds };
	}
}
