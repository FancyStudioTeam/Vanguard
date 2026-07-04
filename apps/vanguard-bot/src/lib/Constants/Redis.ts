import { getEnvVariable } from '#utils/getEnvVariable.js';

export const REDIS_DATABASE_HOST = getEnvVariable('REDIS_DATABASE_HOST');
export const REDIS_DATABASE_PORT = Number(getEnvVariable('REDIS_DATABASE_PORT'));

export const REDIS_DATABASE_USER_NAME = getEnvVariable('REDIS_DATABASE_USER_NAME');
export const REDIS_DATABASE_USER_PASS = getEnvVariable('REDIS_DATABASE_USER_PASS');
