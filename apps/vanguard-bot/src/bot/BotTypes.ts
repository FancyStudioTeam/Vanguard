import type { Bot as InferredBot } from '@vanguard/discord-config/inferred-types';

import type { CommandManager } from '#handlers/ComandManager.js';
import type { EventManager } from '#handlers/EventManager.js';

export interface Bot extends InferredBot {
	commandManager: CommandManager;
	eventManager: EventManager;
}

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];

export type BotInferredTypes = BotTransformers['$inferredTypes'];

export type BotTransformers = Bot['transformers'];
