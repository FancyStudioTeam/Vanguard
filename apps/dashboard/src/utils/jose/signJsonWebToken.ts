import 'server-only';
import type { Snowflake } from 'discord-api-types/globals';
import type { APIUser } from 'discord-api-types/v10';
import { SignJWT } from 'jose';
import {
	JSON_WEB_TOKEN_AUDIENCE,
	JSON_WEB_TOKEN_ISSUER,
	TEXT_ENCODER_SECRET,
} from '#/lib/Constants.ts';

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

	jsonWebToken.setAudience(JSON_WEB_TOKEN_AUDIENCE);

	jsonWebToken.setIssuer(JSON_WEB_TOKEN_ISSUER);
	jsonWebToken.setIssuedAt();

	jsonWebToken.setSubject(subjectId);

	jsonWebToken.setExpirationTime('1d');

	const signedJsonWebToken = await jsonWebToken.sign(TEXT_ENCODER_SECRET);

	return signedJsonWebToken;
}
