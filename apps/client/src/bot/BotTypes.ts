import type { Collection } from '@discordjs/collection';
import type { CommandManager } from '#handlers/commands/CommandManager.js';
import type { ChatInputCommandHandler } from '#handlers/commands/structures/ChatInputCommandHandler.js';
import type { EventManager } from '#handlers/events/EventManager.js';
import type { discordenoBot } from './Bot.js';

export type Bot = typeof discordenoBot & {
	readonly commandManager: CommandManager;
	readonly commands: {
		readonly chatInput: Collection<string, ChatInputCommandHandler>;
	};
	readonly eventManager: EventManager;
};

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];
export type BotTransformers = Bot['transformers'];
