import type { EventManager } from '#handlers/events/EventManager.js';
import type { discordenoBot } from './Bot.js';

export type Bot = typeof discordenoBot & {
	readonly eventManager: EventManager;
};

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];
export type BotTransformers = Bot['transformers'];
