import { createSecretKey } from 'node:crypto';
import { getEnvVariable } from '#utils/Process/getEnvVariable.ts';

const JOSE_AUTH_SECRET_VALUE = getEnvVariable('JOSE_AUTH_SECRET');
const JOSE_AUTH_SECRET_BUFFER = Buffer.from(JOSE_AUTH_SECRET_VALUE, 'hex');

const JOSE_ENCRYPTION_SECRET_VALUE = getEnvVariable('JOSE_ENCRYPTION_SECRET');
const JOSE_ENCRYPTION_SECRET_BUFFER = Buffer.from(
	JOSE_ENCRYPTION_SECRET_VALUE,
	'hex',
);

export const JOSE_AUTH_SECRET = createSecretKey(JOSE_AUTH_SECRET_BUFFER);
export const JOSE_ENCRYPTION_SECRET = createSecretKey(
	JOSE_ENCRYPTION_SECRET_BUFFER,
);

export const JOSE_AUDIENCE = 'https://vanguard.fancystudio.xyz/api' as const;
export const JOSE_ISSUER = 'https://vanguard.fancystudio.xyz' as const;
