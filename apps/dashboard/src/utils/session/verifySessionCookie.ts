import { type JsonWebTokenPayload, verifyJsonWebToken } from '../jose/verifyJsonWebToken.ts';

export async function verifySessionCookie(
	sessionCookieValue: string | null,
): Promise<JsonWebTokenPayload | null> {
	return await verifyJsonWebToken(sessionCookieValue ?? '');
}
