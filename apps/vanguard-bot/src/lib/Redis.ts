import { Redis } from 'ioredis';

import {
	REDIS_DATABASE_HOST,
	REDIS_DATABASE_PORT,
	REDIS_DATABASE_USER_NAME,
	REDIS_DATABASE_USER_PASS,
} from './Constants/Redis.js';
import { logger } from './Logger.js';

export const RedisClient = new Redis({
	host: REDIS_DATABASE_HOST,
	lazyConnect: true,
	password: REDIS_DATABASE_USER_PASS,
	port: REDIS_DATABASE_PORT,
	username: REDIS_DATABASE_USER_NAME,
});

RedisClient.on('error', (error) => logger.error('Redis Client Encountered an Error: ', error));

await RedisClient.connect()
	.then(() => logger.info('Redis Client Connected Successfully'))
	.catch((error) =>
		logger.fatal('Redis Client Encountered an Error while Initializing: ', error),
	);
