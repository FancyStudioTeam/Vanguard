import type { Snowflake } from 'discord-api-types/globals';
import type { APIUser } from 'discord-api-types/v10';
import { SignJWT } from 'jose';
import {
	AUTH_SECRET_ENCODED,
	JOSE_AUDIENCE,
	JOSE_ISSUER,
} from '#lib/Constants.ts';

export async function signJsonWebToken(
	sessionId: string,
	subjectId: Snowflake,
	user: APIUser,
): Promise<string> {
	const { avatar, id, global_name, username } = user;

	const jsonWebToken = new SignJWT({
		sid: sessionId,
		user: {
			avatar,
			id,
			name: global_name ?? username,
		},
	});

	jsonWebToken.setProtectedHeader({
		alg: 'HS256',
		typ: 'JWT',
	});

	jsonWebToken.setAudience(JOSE_AUDIENCE);

	jsonWebToken.setIssuer(JOSE_ISSUER);
	jsonWebToken.setIssuedAt();

	jsonWebToken.setSubject(subjectId);

	jsonWebToken.setExpirationTime('1d');

	const signedJsonWebToken = await jsonWebToken.sign(AUTH_SECRET_ENCODED);

	return signedJsonWebToken;
}
