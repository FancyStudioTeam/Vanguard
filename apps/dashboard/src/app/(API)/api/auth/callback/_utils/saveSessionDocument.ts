import {
	type SessionDocumentCredentials,
	type SessionDocumentUser,
	SessionsCollection,
} from '#lib/MongoDB/Auth.ts';

export async function saveSessionDocument(
	sessionId: string,
	{ credentials, user }: SaveSessionDocumentOptions,
): Promise<void> {
	const { accessToken, refreshToken } = credentials;
	const { avatar, globalName, id, username } = user;

	await SessionsCollection.insertOne({
		credentials: {
			accessToken,
			refreshToken,
		},
		sessionId,
		user: {
			avatar,
			globalName,
			id,
			username,
		},
	});
}

interface SaveSessionDocumentOptions {
	credentials: SessionDocumentCredentials;
	user: SessionDocumentUser;
}
