import { createSecretKey } from 'node:crypto';
import { getEnvVariable } from '#utils/Process/getEnvVariable.ts';

export const AUTH_SECRET = getEnvVariable('AUTH_SECRET');
export const AUTH_SECRET_ENCODED = new TextEncoder().encode(AUTH_SECRET);

export const BASE_URL = getEnvVariable('BASE_URL');

export const CLIENT_ID = getEnvVariable('CLIENT_ID');
export const CLIENT_SECRET = getEnvVariable('CLIENT_SECRET');
export const CLIENT_TOKEN = getEnvVariable('CLIENT_TOKEN');

export const ENCRYPTION_SECRET = Buffer.from(
	getEnvVariable('ENCRYPTION_SECRET'),
	'hex',
);
export const ENCRYPTION_SECRET_ENCODED = createSecretKey(ENCRYPTION_SECRET);

export const JOSE_AUDIENCE = 'https://vanguard.fancystudio.xyz/api' as const;
export const JOSE_ISSUER = 'https://vanguard.fancystudio.xyz' as const;

export const MONGO_DB_COLLECTION_NAME = getEnvVariable(
	'MONGO_DB_COLLECTION_NAME',
);
export const MONGO_DB_CONNECTION_URL = getEnvVariable(
	'MONGO_DB_CONNECTION_URL',
);
export const MONGO_DB_DATABASE_NAME = getEnvVariable('MONGO_DB_DATABASE_NAME');
