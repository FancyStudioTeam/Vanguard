import { cookies as NextCookies } from 'next/headers';
import { JoseUtils, type JsonWebTokenPayload } from './Jose.ts';

export const SessionUtils = {
	async getSessionCookieValue(): Promise<string | null> {
		const nextCookies = await NextCookies();
		const sessionCookie = nextCookies.get('session');

		if (!sessionCookie) {
			return null;
		}

		const { value: sessionCookieValue } = sessionCookie;

		return sessionCookieValue;
	},

	async verifySessionCookie(
		sessionCookieValue: string | null,
	): Promise<JsonWebTokenPayload | null> {
		return await JoseUtils.verify(sessionCookieValue ?? '');
	},
} as const;
