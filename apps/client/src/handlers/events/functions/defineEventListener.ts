import type { BotEventNames } from '#bot/BotTypes.js';
import type { EventListener } from '../EventTypes.js';

export function defineEventListener<Name extends BotEventNames>(
	options: DefineEventListenerOptions<Name>,
): EventListener<Name> {
	return options;
}

type DefineEventListenerOptions<Name extends BotEventNames> = EventListener<Name>;
