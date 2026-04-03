import 'server-only';
import { getEnvVariable } from '#/utils/getEnvVariable.ts';

export const AUTH_SECRET = getEnvVariable('AUTH_SECRET');

export const BASE_URL = getEnvVariable('BASE_URL');

export const CLIENT_ID = getEnvVariable('CLIENT_ID');
export const CLIENT_SECRET = getEnvVariable('CLIENT_SECRET');
export const CLIENT_TOKEN = getEnvVariable('CLIENT_TOKEN');

export const ENCRYPTION_KEY = getEnvVariable('ENCRYPTION_KEY');

export const JSON_WEB_TOKEN_AUDIENCE = 'https://vanguard.fancystudio.xyz/api' as const;
export const JSON_WEB_TOKEN_ISSUER = 'https://vanguard.fancystudio.xyz' as const;

export const MONGO_DB_COLLECTION_NAME = getEnvVariable('MONGO_DB_COLLECTION_NAME');
export const MONGO_DB_CONNECTION_URL = getEnvVariable('MONGO_DB_CONNECTION_URL');
export const MONGO_DB_DATABASE_NAME = getEnvVariable('MONGO_DB_DATABASE_NAME');

export const TEXT_ENCODER = new TextEncoder();
export const TEXT_ENCODER_SECRET = TEXT_ENCODER.encode(AUTH_SECRET);
