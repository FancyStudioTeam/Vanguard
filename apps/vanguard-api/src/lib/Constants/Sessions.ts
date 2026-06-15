import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

export const SESSION_COOKIE_MAX_AGE = 86_400;
export const SESSION_COOKIE_NAME = 'session_data';
export const SESSION_COOKIE_SALT = getEnvVariable('SESSION_COOKIE_SALT');
export const SESSION_COOKIE_SECRET = getEnvVariable('SESSION_COOKIE_SECRET');

export const SESSIONS_DATABASE_HOST = getEnvVariable('SESSIONS_DATABASE_HOST');
export const SESSIONS_DATABASE_NAME = getEnvVariable('SESSIONS_DATABASE_NAME');
export const SESSIONS_DATABASE_PORT = getEnvVariable('SESSIONS_DATABASE_PORT');

export const SESSIONS_DATABASE_USER_NAME = getEnvVariable('SESSIONS_DATABASE_USER_NAME');
export const SESSIONS_DATABASE_USER_PASSWORD = getEnvVariable('SESSIONS_DATABASE_USER_PASSWORD');
