import { getEnvVariable } from '#utils/Process/getEnvVariable.js';

export const MONGO_DB_COLLECTION_NAME = getEnvVariable('MONGO_DB_COLLECTION_NAME');
export const MONGO_DB_CONNECTION_URL = getEnvVariable('MONGO_DB_CONNECTION_URL');
