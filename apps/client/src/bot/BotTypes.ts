import type { Collection } from '@discordeno/bot';
import type { CommandManager } from '#handlers/commands/CommandManager.js';
import type { ChatInputCommandHandler } from '#handlers/commands/structures/ChatInputCommandHandler.js';
import type { UserContextCommandHandler } from '#handlers/commands/structures/UserContextCommandHandler.js';
import type { EventManager } from '#handlers/events/EventManager.js';
import type { discordenoBot } from './Bot.js';

export type Bot = typeof discordenoBot & {
	readonly commandManager: CommandManager;
	readonly commands: {
		readonly chatInput: Collection<string, ChatInputCommandHandler>;
		readonly userContext: Collection<string, UserContextCommandHandler>;
	};
	readonly eventManager: EventManager;
};

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];

export type BotInferredTypes = BotTransformers['$inferredTypes'];

export type BotTransformers = Bot['transformers'];
