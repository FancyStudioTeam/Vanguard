import { defineEventListener } from 'ddenox/handlers';
import { logger } from '#lib/Logger.js';

export default defineEventListener({
	data: {
		name: 'ready',
	},
	run(payload) {
		const { user } = payload;
		const { username } = user;

		logger.info(`Client '${username}' has been connected`);
	},
});
