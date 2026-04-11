import { getEnvVariable } from '#utils/Process/getEnvVariable.js';
import { normalizeUrl } from '#utils/URL/normalizeUrl.js';

const BASE_DASHBOARD_URL_VALUE = getEnvVariable('BASE_DASHBOARD_URL');
const BASE_URL_VALUE = getEnvVariable('BASE_URL');

export const BASE_DASHBOARD_URL = normalizeUrl(BASE_DASHBOARD_URL_VALUE);
export const BASE_URL = normalizeUrl(BASE_URL_VALUE);
