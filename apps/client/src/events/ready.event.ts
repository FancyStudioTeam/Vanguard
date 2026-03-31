import type { EventHandler } from '#handlers/events/EventTypes.js';
import { defineEventConfig } from '#handlers/events/functions/defineEventConfig.js';
import { logger } from '#lib/Logger.js';

export const config = defineEventConfig({
	name: 'ready',
});

export const handler: EventHandler<typeof config> = ({ user }) =>
	logger.info(`Client '${user.username}' has been connected`);
