import { GuildWelcomesEntity } from '@vanguard/shared-typeorm/GuildWelcomesEntity.js';

import { DataSource } from 'typeorm';

import {
	POSTGRES_DATABASE_HOST,
	POSTGRES_DATABASE_NAME,
	POSTGRES_DATABASE_PORT,
	POSTGRES_DATABASE_USER_NAME,
	POSTGRES_DATABASE_USER_PASS,
} from './Constants/TypeORM.js';
import { logger } from './Logger.js';

export const AppDataSource = new DataSource({
	database: POSTGRES_DATABASE_NAME,
	entities: [
		GuildWelcomesEntity,
	],
	host: POSTGRES_DATABASE_HOST,
	password: POSTGRES_DATABASE_USER_PASS,
	port: POSTGRES_DATABASE_PORT,
	synchronize: true,
	type: 'postgres',
	username: POSTGRES_DATABASE_USER_NAME,
});

export const GuildWelcomesRepository = AppDataSource.getRepository(GuildWelcomesEntity);

await AppDataSource.initialize()
	.then(() => logger.info('Data Source Initialized Successfully'))
	.catch((error) => logger.fatal('Data Source Encountered an Error while Initializing: ', error));
