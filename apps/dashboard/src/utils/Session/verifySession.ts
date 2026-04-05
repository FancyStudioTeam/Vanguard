import { unauthorized } from 'next/navigation';
import { sessionsCollection } from '#/lib/auth/MongoDB.ts';
import { decrypt } from '../encryption/decrypt.ts';
import type { JsonWebTokenPayload } from '../jose/verifyJsonWebToken.ts';
import { getSessionCookieValue } from './getSessionCookieValue.ts';
import { verifySessionCookie } from './verifySessionCookie.ts';

export async function verifySession(
	withCredentials?: false,
): Promise<SessionWithoutCredentials>;
export async function verifySession(
	withCredentials: true,
): Promise<SessionWithCredentials>;

export async function verifySession(
	withCredentials?: boolean,
): Promise<JsonWebTokenPayload> {
	const sessionCookieValue = await getSessionCookieValue();
	const jsonWebTokenPayload = await verifySessionCookie(sessionCookieValue);

	if (!jsonWebTokenPayload) {
		unauthorized();
	}

	if (!withCredentials) {
		return jsonWebTokenPayload;
	} else {
		const { sid: sessionId } = jsonWebTokenPayload;
		const sessionData = await sessionsCollection.findOne({
			sessionId: String(sessionId),
		});

		if (!sessionData) {
			unauthorized();
		}

		const { credentials } = sessionData;
		const { accessToken, refreshToken } = credentials;

		const unencryptedAccessToken = decrypt(accessToken);
		const unencryptedRefreshToken = decrypt(refreshToken);

		return {
			...jsonWebTokenPayload,
			accessToken: unencryptedAccessToken,
			refreshToken: unencryptedRefreshToken,
		};
	}
}

interface SessionWithCredentials extends JsonWebTokenPayload {
	accessToken: string;
	refreshToken: string;
}

type SessionWithoutCredentials = JsonWebTokenPayload;
