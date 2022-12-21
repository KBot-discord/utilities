import { InteractionHandler } from '@sapphire/framework';
import { parseCustomId } from '@kbotdev/custom-id';
import type { MessageComponentInteraction } from 'discord.js';
import type { CustomId } from '../types';

export abstract class MenuInteractionHandler extends InteractionHandler {
	private readonly customIdPrefix: string;

	protected constructor(context: InteractionHandler.Context, options: MenuInteractionHandlerOptions) {
		super(context, options);
		this.customIdPrefix = options.customIdPrefix;
	}

	public override parse(interaction: MessageComponentInteraction) {
		if (!interaction.customId.startsWith(this.customIdPrefix)) return this.none();
		const data = parseCustomId(interaction.customId as CustomId);
		return this.some(data);
	}
}

export interface MenuInteractionHandlerOptions extends InteractionHandler.Options {
	customIdPrefix: string;
}

export namespace MenuInteractionHandler {
	export type Options = MenuInteractionHandlerOptions;
}
