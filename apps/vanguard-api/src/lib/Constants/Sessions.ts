import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

export const SESSIONS_DATABASE_HOST = getEnvVariable('SESSIONS_DATABASE_HOST');
export const SESSIONS_DATABASE_NAME = getEnvVariable('SESSIONS_DATABASE_NAME');
export const SESSIONS_DATABASE_PORT = getEnvVariable('SESSIONS_DATABASE_PORT');
export const SESSIONS_DATABASE_USER = getEnvVariable('SESSIONS_DATABASE_USER');
