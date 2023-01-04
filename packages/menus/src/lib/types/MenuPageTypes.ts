import type { AnyInteraction } from '@sapphire/discord.js-utilities';
import type { APIMessage } from 'discord-api-types/v9';
import type {
	Awaitable,
	User,
	Message,
	InteractionCollector,
	MessageComponentInteraction,
	MessageOptions,
	MessageSelectOptionData,
	WebhookEditMessageOptions,
	InteractionReplyOptions,
	InteractionUpdateOptions,
	ReplyMessageOptions,
	MessageEditOptions,
	MessageEmbed,
	MessageActionRow,
	ButtonInteraction,
	SelectMenuInteraction
} from 'discord.js';
import type { Menu } from '../structures/Menu';
import type { MenuPageBuilder } from '../structures/MenuPageBuilder';
import type { MenuPagesBuilder } from '../structures/MenuPagesBuilder';

export interface MenuPage {
	embeds: MessageEmbed[];
	components: MessageActionRow[];
}

export type MenuPageResolvable = MenuPageBuilder | MenuPage;

export type MenuPagesResolvable = MenuPageResolvable[] | MenuPageBuilder[] | MenuPage[] | MenuPagesBuilder;

export interface MenuArrowFunction {
	run(context: MenuArrowFunctionContext): Awaitable<unknown>;
}

export interface MenuArrowFunctionContext {
	interaction: ButtonInteraction | SelectMenuInteraction;
	handler: Menu;
	collector: InteractionCollector<MessageComponentInteraction>;
}

export interface MenuOptions {
	pages?: MenuPage[];
	sharedRows?: MessageActionRow[];
}

export type MenuSelectMenuOptionsFunction = (pageIndex: number) => Awaitable<Omit<MessageSelectOptionData, 'value'>>;

export type MenuWrongUserInteractionReplyFunction = (
	targetUser: User,
	interactionUser: User
) => Awaitable<Parameters<MessageComponentInteraction['reply']>[0]>;

export type MenuEmbedResolvable = MessageOptions['embeds'];

export interface SafeReplyToInteractionParameters<T extends 'edit' | 'reply' | never = never> {
	messageOrInteraction: APIMessage | Message | AnyInteraction;
	interactionEditReplyContent: WebhookEditMessageOptions;
	interactionReplyContent: InteractionReplyOptions;
	componentUpdateContent: InteractionUpdateOptions;
	messageMethod?: T;
	messageMethodContent?: T extends 'reply' ? ReplyMessageOptions : MessageEditOptions;
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
