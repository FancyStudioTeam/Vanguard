import { jwtVerify } from 'jose';
import {
	AUTH_SECRET_ENCODED,
	JOSE_AUDIENCE,
	JOSE_ISSUER,
} from '#lib/Constants.ts';
import type { AuthJsonWebTokenPayload } from '#types/Auth.ts';

export async function verifyJsonWebToken(
	jsonWebToken: string,
): Promise<AuthJsonWebTokenPayload> {
	return await jwtVerify<AuthJsonWebTokenPayload>(
		jsonWebToken,
		AUTH_SECRET_ENCODED,
		{
			algorithms: [
				'HS256',
			],
			audience: JOSE_AUDIENCE,
			issuer: JOSE_ISSUER,
		},
	).then(({ payload }) => payload);
}
