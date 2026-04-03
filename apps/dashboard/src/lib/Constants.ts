import 'server-only';
import { env } from 'node:process';

export const {
	AUTH_SECRET,

	BASE_URL,

	CLIENT_ID,
	CLIENT_SECRET,
	CLIENT_TOKEN,

	ENCRYPTION_KEY,

	MONGO_DB_COLLECTION_NAME,
	MONGO_DB_CONNECTION_URL,
	MONGO_DB_DATABASE_NAME,
} = env;

export const JSON_WEB_TOKEN_AUDIENCE = 'https://vanguard.fancystudio.xyz/api' as const;
export const JSON_WEB_TOKEN_ISSUER = 'https://vanguard.fancystudio.xyz' as const;

export const TEXT_ENCODER = new TextEncoder();
export const TEXT_ENCODER_SECRET = TEXT_ENCODER.encode(AUTH_SECRET);
