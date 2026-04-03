import { cookies as NextCookies } from 'next/headers';

export async function getSessionCookieValue(): Promise<string | null> {
	const nextCookies = await NextCookies();
	const sessionCookie = nextCookies.get('session');

	if (!sessionCookie) {
		return null;
	}

	const { value: sessionCookieValue } = sessionCookie;

	return sessionCookieValue;
}
