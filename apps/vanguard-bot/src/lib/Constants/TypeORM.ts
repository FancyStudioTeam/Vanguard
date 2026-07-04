import { getEnvVariable } from '#utils/getEnvVariable.js';

export const POSTGRES_DATABASE_HOST = getEnvVariable('POSTGRES_DATABASE_HOST');
export const POSTGRES_DATABASE_NAME = getEnvVariable('POSTGRES_DATABASE_NAME');
export const POSTGRES_DATABASE_PORT = Number(getEnvVariable('POSTGRES_DATABASE_PORT'));

export const POSTGRES_DATABASE_USER_NAME = getEnvVariable('POSTGRES_DATABASE_USER_NAME');
export const POSTGRES_DATABASE_USER_PASS = getEnvVariable('POSTGRES_DATABASE_USER_PASS');
