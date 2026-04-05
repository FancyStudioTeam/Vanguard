import { getEnvVariable } from '#utils/Process/getEnvVariable.ts';

export const CLIENT_ID = getEnvVariable('CLIENT_ID');
export const CLIENT_SECRET = getEnvVariable('CLIENT_SECRET');
export const CLIENT_TOKEN = getEnvVariable('CLIENT_TOKEN');
