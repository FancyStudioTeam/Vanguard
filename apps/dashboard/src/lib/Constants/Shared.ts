import { env } from 'node:process';
import { getEnvVariable } from '#utils/Process/getEnvVariable.ts';

export const BASE_URL = getEnvVariable('BASE_URL');

export const NODE_ENV = env.NODE_ENV;
