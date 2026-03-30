import './env.js';

import { bot } from './lib/Client.js';
import { logger } from './lib/Logger.js';

bot.start();

bot.events.debug = (information) => logger.debug(information);
bot.events.ready = ({ user }) => {
	const { username } = user;

	logger.info(`Client ${username} has been connected`);
};
