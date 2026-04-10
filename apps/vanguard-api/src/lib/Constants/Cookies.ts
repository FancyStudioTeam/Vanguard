import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

export const COOKIE_SALT = getEnvVariable('COOKIE_SALT');
export const COOKIE_SECRET = getEnvVariable('COOKIE_SECRET');

export const COOKIE_SESSION_DATA_NAME = 'session_data';
