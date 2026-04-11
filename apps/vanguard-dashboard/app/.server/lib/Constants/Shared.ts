import { getEnvVariable } from '#server/utils/Process/getEnvVariable.ts';
import { normalizeUrl } from '#server/utils/URL/normalizeUrl.ts';

const BASE_API_URL_VALUE = getEnvVariable('BASE_API_URL');
const BASE_URL_VALUE = getEnvVariable('BASE_URL');

export const BASE_API_URL = normalizeUrl(BASE_API_URL_VALUE);
export const BASE_URL = normalizeUrl(BASE_URL_VALUE);
