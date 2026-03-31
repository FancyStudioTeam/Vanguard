import type { client } from '#client/Client.js';

export function defineEventConfig<EventName extends ClientEventsName>(
	config: EventConfig<EventName>,
): EventConfig<EventName> {
	return config;
}

interface EventConfig<EventName extends ClientEventsName> {
	name: EventName;
}

type ClientEvents = (typeof client)['events'];
type ClientEventsName = keyof ClientEvents;
