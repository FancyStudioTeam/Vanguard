import { type InteractionCallbackData, InteractionResponseTypes } from '@discordeno/bot';
import type { Bot } from '#bot/BotTypes.js';
import type { Interaction, Message } from '#lib/InferredTypes.js';

export class HandlerBase {
	public bot: Bot | null = null;
	public interaction: Interaction | null = null;

	private getHandlerProperty<PropertyName extends keyof HandlerBase>(
		propertyName: PropertyName,
	): NonNullable<HandlerBase[PropertyName]> {
		const property = this[propertyName];

		if (!property) {
			throw new TypeError(`Property '${propertyName}' is not configured`);
		}

		return property;
	}

	protected setBot(bot: Bot): void {
		this.bot = bot;
	}

	protected setInteraction(interaction: Interaction): void {
		this.interaction = interaction;
	}

	public async createInteractionFollowup(
		options: CreateInteractionFollowupOptions,
	): Promise<Message> {
		const { helpers } = this.getBot();
		const { token } = this.getInteraction();

		return await helpers.sendFollowupMessage(token, options);
	}

	public async createInteractionMessage(options: CreateInteractionMessageOptions): Promise<void> {
		const { helpers } = this.getBot();
		const { id, token } = this.getInteraction();

		return void (await helpers.sendInteractionResponse(id, token, {
			data: options,
			type: InteractionResponseTypes.ChannelMessageWithSource,
		}));
	}

	public getBot(): Bot {
		return this.getHandlerProperty('bot');
	}

	public getInteraction(): Interaction {
		return this.getHandlerProperty('interaction');
	}
}

type CreateInteractionFollowupOptions = CreateInteractionMessageOptions;
type CreateInteractionMessageOptions = Pick<
	InteractionCallbackData,
	'allowedMentions' | 'components' | 'content' | 'embeds' | 'files' | 'flags' | 'poll' | 'tts'
>;
