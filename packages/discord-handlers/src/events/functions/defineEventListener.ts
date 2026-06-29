import type { BotEventNames } from '@vanguard/discord-config/inferred-types-bot';

import type { EventListener } from '#events/types/Event.js';

export function defineEventListener<Name extends BotEventNames>(
	options: DefineEventListenerOptions<Name>,
): EventListener<Name> {
	return options;
}

export type DefineEventListenerOptions<Name extends BotEventNames> = EventListener<Name>;
