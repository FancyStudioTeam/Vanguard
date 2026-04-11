import { normalizeUrl } from '#server/utils/URL/normalizeUrl.ts';

const { VITE_BASE_API_URL, VITE_BASE_URL } = import.meta.env;

export const BASE_API_URL = normalizeUrl(VITE_BASE_API_URL);
export const BASE_URL = normalizeUrl(VITE_BASE_URL);
