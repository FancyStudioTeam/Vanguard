import type { BotEventNames } from '@vanguard/discord-desired-properties/inferred-types';

import type { EventListener } from '#events/types/Event.js';

export function defineEventListener<Name extends BotEventNames>(options: DefineEventListenerOptions<Name>): EventListener<Name> {
	return options;
}

export type DefineEventListenerOptions<Name extends BotEventNames> = EventListener<Name>;
