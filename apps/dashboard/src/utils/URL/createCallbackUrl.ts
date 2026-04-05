import { BASE_URL } from '#lib/Constants/Shared.ts';

export function createCallbackUrl(): string {
	return `${BASE_URL}/api/auth/callback`;
}
