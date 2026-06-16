import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

export const SESSION_COOKIE_MAX_AGE = 43_200;
export const SESSION_COOKIE_NAME = 'session_data';
export const SESSION_COOKIE_SALT = getEnvVariable('SESSION_COOKIE_SALT');
export const SESSION_COOKIE_SECRET = getEnvVariable('SESSION_COOKIE_SECRET');
