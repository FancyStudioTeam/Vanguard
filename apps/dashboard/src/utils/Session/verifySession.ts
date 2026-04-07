import { unauthorized } from 'next/navigation';
import { type SessionDocument, SessionsCollection } from '#lib/MongoDB/Auth.ts';
import { decryptData } from '#utils/Jose/decryptData.ts';
import { getSessionId } from './getSessionId.ts';

export async function verifySession(): Promise<
	Omit<SessionDocument, 'sessionId'>
> {
	const sessionId = await getSessionId();
	const session = await SessionsCollection.findOne({
		sessionId,
	});

	if (!session) {
		unauthorized();
	}

	const { credentials, user } = session;
	const { accessToken, refreshToken } = credentials;

	const decryptedAccessToken = await decryptData(accessToken);
	const decryptedRefreshToken = await decryptData(refreshToken);

	return {
		credentials: {
			accessToken: decryptedAccessToken,
			refreshToken: decryptedRefreshToken,
		},
		user,
	};
}
