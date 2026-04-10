import { getEnvVariable } from '#utils/Process/getEnvVariable.js';
import { BASE_URL } from './Shared.js';

export const COOKIE_SALT = getEnvVariable('COOKIE_SALT');
export const COOKIE_SECRET = getEnvVariable('COOKIE_SECRET');

export const COOKIE_SESSION_DATA_DOMAIN = new URL(BASE_URL).hostname;
export const COOKIE_SESSION_DATA_MAX_AGE = 86_400;
export const COOKIE_SESSION_DATA_NAME = 'session_data';
