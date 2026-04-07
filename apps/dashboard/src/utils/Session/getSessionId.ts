import { cookies as NextCookies } from 'next/headers';
import { COOKIE_SESSION_ID_NAME } from '#lib/Constants/Cookies.ts';

export async function getSessionId(): Promise<string> {
	const nextCookies = await NextCookies();
	const sessionCookie = nextCookies.get(COOKIE_SESSION_ID_NAME);

	if (!sessionCookie) {
		return '';
	}

	const { value: sessionCookieValue } = sessionCookie;

	return sessionCookieValue;
}
