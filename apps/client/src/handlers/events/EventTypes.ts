import type { BotEventNames, BotEvents } from '#bot/BotTypes.js';

export interface EventListener<Name extends BotEventNames> {
	data: EventListenerData<Name>;
	run: EventListenerRunFunction<Name>;
}

export interface EventListenerData<Name extends BotEventNames> {
	name: Name;
}

export type EventListenerRunFunction<Name extends BotEventNames> = (
	// @ts-expect-error
	...data: Parameters<BotEvents[Name]>
) => unknown;
