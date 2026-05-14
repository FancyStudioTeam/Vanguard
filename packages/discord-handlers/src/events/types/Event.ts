import type { BotEventNames, BotEvents } from '@vanguard/discord-config/inferred-bot-types';

export interface EventListener<Name extends BotEventNames> {
	data: EventListenerData<Name>;
	run: EventListenerRunMethod<Name>;
}

export interface EventListenerData<Name extends BotEventNames> {
	name: Name;
}

// @ts-expect-error
export type EventListenerRunMethod<Name extends BotEventNames> = (...data: Parameters<BotEvents[Name]>) => unknown;
