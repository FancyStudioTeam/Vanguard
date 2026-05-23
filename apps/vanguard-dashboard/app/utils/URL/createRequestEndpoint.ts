import { BASE_API_URL } from '#lib/Shared.ts';

export function createRequestUrl(endpoint: string): string {
	return `${BASE_API_URL}/api/${endpoint}`;
}
