import { InteractionHandler } from '@sapphire/framework';
import { parseCustomId } from '@kbotdev/custom-id';
import type { MessageComponentInteraction } from 'discord.js';

export abstract class MenuInteractionHandler extends InteractionHandler {
	private readonly customIdPrefix: string;
	private readonly defer: DeferOptions | undefined;
	private readonly ephemeral: boolean | undefined;

	protected constructor(context: InteractionHandler.Context, options: MenuInteractionHandlerOptions) {
		super(context, options);
		this.customIdPrefix = options.customIdPrefix;
		this.defer = options.defer;
		this.ephemeral = options.ephemeral;
	}

	public override async parse(interaction: MessageComponentInteraction) {
		if (!interaction.customId.startsWith(this.customIdPrefix)) return this.none();
		const data = parseCustomId(interaction.customId);
		if (this.defer === DeferOptions.Reply) {
			await interaction.deferReply({ ephemeral: this.ephemeral });
		} else if (this.defer === DeferOptions.Update) {
			await interaction.deferUpdate();
		}
		return this.some(data);
	}
}

export const enum DeferOptions {
	Reply = 'reply',
	Update = 'update'
}

export interface MenuInteractionHandlerOptions extends InteractionHandler.Options {
	customIdPrefix: string;
	defer?: DeferOptions;
	ephemeral?: boolean;
}

export namespace MenuInteractionHandler {
	export type Options = MenuInteractionHandlerOptions;
}
