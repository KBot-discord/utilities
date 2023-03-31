import type { AnyInteraction } from '@sapphire/discord.js-utilities';
import type {
	ActionRowBuilder,
	APIMessage,
	Awaitable,
	BaseMessageOptions,
	ButtonBuilder,
	ButtonInteraction,
	EmbedBuilder,
	InteractionCollector,
	InteractionReplyOptions,
	InteractionUpdateOptions,
	Message,
	MessageComponentInteraction,
	MessageEditOptions,
	MessageReplyOptions,
	SelectMenuComponentOptionData,
	StringSelectMenuBuilder,
	StringSelectMenuInteraction,
	User,
	WebhookMessageEditOptions
} from 'discord.js';
import type { Menu } from '../structures/Menu';
import type { MenuPageBuilder } from '../structures/MenuPageBuilder';
import type { MenuPagesBuilder } from '../structures/MenuPagesBuilder';

export type MenuPageRowUnion = ButtonBuilder | StringSelectMenuBuilder;

export interface MenuPage {
	embeds: EmbedBuilder[];
	components: ActionRowBuilder<MenuPageRowUnion>[];
}

export type MenuPageResolvable = MenuPageBuilder | MenuPage;

export type MenuPagesResolvable = MenuPageResolvable[] | MenuPageBuilder[] | MenuPage[] | MenuPagesBuilder;

export interface MenuArrowFunction {
	run(context: MenuArrowFunctionContext): Awaitable<unknown>;
}

export interface MenuArrowFunctionContext {
	interaction: ButtonInteraction | StringSelectMenuInteraction;
	handler: Menu;
	collector: InteractionCollector<ButtonInteraction | StringSelectMenuInteraction>;
}

export interface MenuOptions {
	pages?: MenuPage[];
	sharedRows?: ActionRowBuilder<MenuPageRowUnion>[];
}

export type MenuSelectMenuOptionsFunction = (pageIndex: number) => Awaitable<Omit<SelectMenuComponentOptionData, 'value'>>;

export type MenuWrongUserInteractionReplyFunction = (
	targetUser: User,
	interactionUser: User
) => Awaitable<Parameters<MessageComponentInteraction['reply']>[0]>;

export type MenuEmbedResolvable = BaseMessageOptions['embeds'];

export interface SafeReplyToInteractionParameters<T extends 'edit' | 'reply' | never = never> {
	messageOrInteraction: APIMessage | Message | AnyInteraction;
	interactionEditReplyContent: WebhookMessageEditOptions;
	interactionReplyContent: InteractionReplyOptions;
	componentUpdateContent: InteractionUpdateOptions;
	messageMethod?: T;
	messageMethodContent?: T extends 'reply' ? MessageReplyOptions : MessageEditOptions;
}

export type MenuStopReasons =
	| 'time'
	| 'idle'
	| 'user'
	| 'messageDelete'
	| 'channelDelete'
	| 'threadDelete'
	| 'guildDelete'
	| 'limit'
	| 'componentLimit'
	| 'userLimit';
