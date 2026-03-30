import { loadEnvFile } from 'node:process';
import { bot } from './lib/Client.js';
import { logger } from './lib/Logger.js';
import { getEnvFileName } from './utils/getEnvFileName.js';

loadEnvFile(getEnvFileName());

bot.start();

bot.events.debug = (information) => logger.debug(information);
bot.events.ready = ({ user }) => {
	const { username } = user;

	logger.info(`Client ${username} has been connected`);
};
