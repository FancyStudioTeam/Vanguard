import {
	type JsonWebTokenPayload,
	verifyJsonWebToken,
} from '../jose/verifyJsonWebToken.ts';

export async function verifySessionCookie(
	sessionCookieValue: string | null,
): Promise<JsonWebTokenPayload | null> {
	if (!sessionCookieValue) {
		return null;
	}

	return await verifyJsonWebToken(sessionCookieValue);
}
