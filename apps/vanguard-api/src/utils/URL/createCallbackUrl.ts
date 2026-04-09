import { BASE_URL } from '#lib/Constants/Shared.js';

export function createCallbackUrl(): string {
	return `${BASE_URL}/auth/callback`;
}
