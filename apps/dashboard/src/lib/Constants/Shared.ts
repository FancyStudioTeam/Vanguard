import { env } from 'node:process';
import { getEnvVariable } from '#utils/Process/getEnvVariable.ts';
import { normalizeUrl } from '#utils/URL/normalizeUrl.ts';

export const BASE_API_URL = normalizeUrl(getEnvVariable('BASE_API_URL'));
export const BASE_URL = normalizeUrl(getEnvVariable('BASE_URL'));

export const NODE_ENV = env.NODE_ENV;
