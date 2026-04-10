import { getEnvVariable } from '#utils/Process/getEnvVariable.js';
import { normalizeUrl } from '#utils/URL/normalizeUrl.js';

export const BASE_DASHBOARD_URL = normalizeUrl(getEnvVariable('BASE_DASHBOARD_URL'));
export const BASE_URL = normalizeUrl(getEnvVariable('BASE_URL'));
