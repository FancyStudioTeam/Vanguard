import { unauthorized } from 'next/navigation';
import { SessionsCollection } from '#lib/MongoDB/Auth.ts';
import type { AuthJsonWebTokenPayload } from '#types/Auth.ts';
import { decryptData } from '#utils/Jose/decryptData.ts';
import { verifyJsonWebToken } from '#utils/Jose/verifyJsonWebToken.ts';
import { getSessionCookieValue } from './getSessionCookieValue.ts';

export async function verifySession(
	withCredentials?: false,
): Promise<SessionWithoutCredentials>;
export async function verifySession(
	withCredentials: true,
): Promise<SessionWithCredentials>;

export async function verifySession(
	withCredentials?: boolean,
): Promise<AuthJsonWebTokenPayload> {
	const sessionCookieValue = await getSessionCookieValue();
	const jsonWebTokenPayload = await verifyJsonWebToken(
		sessionCookieValue ?? '',
	);

	if (!jsonWebTokenPayload) {
		unauthorized();
	}

	if (!withCredentials) {
		return jsonWebTokenPayload;
	} else {
		const { sid: sessionId } = jsonWebTokenPayload;

		const sessionData = await SessionsCollection.findOne({
			sessionId: String(sessionId),
		});

		if (!sessionData) {
			unauthorized();
		}

		const { credentials } = sessionData;
		const { accessToken, refreshToken } = credentials;

		const unencryptedAccessToken = await decryptData(accessToken);
		const unencryptedRefreshToken = await decryptData(refreshToken);

		return {
			...jsonWebTokenPayload,
			accessToken: unencryptedAccessToken,
			refreshToken: unencryptedRefreshToken,
		};
	}
}

interface SessionWithCredentials extends AuthJsonWebTokenPayload {
	accessToken: string;
	refreshToken: string;
}

type SessionWithoutCredentials = AuthJsonWebTokenPayload;
