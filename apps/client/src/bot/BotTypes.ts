import type { EventManager } from '#handlers/events/EventManager.js';
import type { discordenoBot } from './Bot.js';

export type Bot = typeof discordenoBot & {
	eventManager: EventManager;
};

export type BotEvents = Bot['events'];
export type BotTransformers = Bot['transformers'];
