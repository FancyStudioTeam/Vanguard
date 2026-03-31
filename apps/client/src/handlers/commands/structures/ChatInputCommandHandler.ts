import { ApplicationCommandTypes, type CreateSlashApplicationCommand } from '@discordeno/bot';
import type { Bot } from '#bot/BotTypes.js';
import type { Interaction } from '#lib/InferredTypes.js';
import type { Constructor } from '#lib/Types.js';

export abstract class ChatInputCommandHandler {
	declare readonly declare: ChatInputCommandHandlerDeclareOptions;

	abstract run(options: ChatInputCommandHandlerRunOptions): unknown;

	toOptions(): CreateSlashApplicationCommand {
		const { declare } = this;

		return {
			...declare,
			type: ApplicationCommandTypes.ChatInput,
		};
	}
}

export interface ChatInputCommandHandlerRunOptions {
	bot: Bot;
	interaction: Interaction;
}

export type ChatInputCommandHandlerConstructor = Constructor<ChatInputCommandHandler>;
export type ChatInputCommandHandlerDeclareOptions = Omit<CreateSlashApplicationCommand, 'type'>;
