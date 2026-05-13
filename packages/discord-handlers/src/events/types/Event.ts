import type { BotEventNames, BotEvents } from '@vanguard/discord-desired-properties/inferred-types';

export interface EventListener<Name extends BotEventNames> {
	data: EventListenerData<Name>;
	run: EventListenerRunMethod<Name>;
}

export interface EventListenerData<Name extends BotEventNames> {
	name: Name;
}

export type EventListenerRunMethod<Name extends BotEventNames> = (
	// @ts-expect-error
	...data: Parameters<BotEvents[Name]>
) => unknown;
