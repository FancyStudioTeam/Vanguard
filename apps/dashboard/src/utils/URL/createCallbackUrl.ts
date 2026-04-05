import 'server-only';
import { BASE_URL } from '#/lib/Constants.ts';

export function createCallbackUrl(): string {
	return `${BASE_URL}/api/auth/callback`;
}
