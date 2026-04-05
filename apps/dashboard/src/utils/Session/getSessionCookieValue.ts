import { cookies as NextCookies } from 'next/headers';
import { COOKIE_SESSION_NAME } from '#lib/Constants/Cookies.ts';

export async function getSessionCookieValue(): Promise<string | null> {
	const nextCookies = await NextCookies();
	const sessionCookie = nextCookies.get(COOKIE_SESSION_NAME);

	if (!sessionCookie) {
		return null;
	}

	const { value: sessionCookieValue } = sessionCookie;

	return sessionCookieValue;
}
