import { SessionsCollection } from '#lib/MongoDB/Auth.ts';
import type { AuthUser } from '#types/Auth.ts';

export async function saveSessionDocument(
	sessionId: string,
	{ credentials, user }: SaveSessionDocumentOptions,
): Promise<void> {
	const { accessToken, refreshToken } = credentials;
	const { avatar, id, name } = user;

	await SessionsCollection.insertOne({
		credentials: {
			accessToken,
			refreshToken,
		},
		sessionId,
		user: {
			avatar,
			id,
			name,
		},
	});
}

interface SaveSessionDocumentCredentials {
	accessToken: string;
	refreshToken: string;
}

interface SaveSessionDocumentOptions {
	credentials: SaveSessionDocumentCredentials;
	user: SaveSessionDocumentUser;
}

type SaveSessionDocumentUser = AuthUser;
