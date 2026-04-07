import { cookies as NextCookies } from 'next/headers';
import { COOKIE_SESSION_ID_NAME } from '#lib/Constants/Cookies.ts';

export async function saveSessionIdCookie(
	sessionId: string,
	{ expiresIn }: SaveSessionIdCookieOptions,
): Promise<void> {
	const nextCookies = await NextCookies();

	nextCookies.set(COOKIE_SESSION_ID_NAME, sessionId, {
		httpOnly: true,
		maxAge: expiresIn,
		path: '/',
		sameSite: 'lax',
		secure: true,
	});
}

interface SaveSessionIdCookieOptions {
	expiresIn: number;
}
