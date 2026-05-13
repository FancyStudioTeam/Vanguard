import type { EventListener } from '#events/types/Event.js';
import type { BotEventNames } from '#types/Bot.js';

export function defineEventListener<Name extends BotEventNames>(options: DefineEventListenerOptions<Name>): EventListener<Name> {
	return options;
}

export type DefineEventListenerOptions<Name extends BotEventNames> = EventListener<Name>;
