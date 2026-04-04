import { type JWTPayload, jwtVerify } from 'jose';
import { AUTH_SECRET_ENCODED, JOSE_AUDIENCE, JOSE_ISSUER } from '#lib/Constants.ts';
import type { User } from '#lib/types/User.ts';

export async function verifyJsonWebToken(
	jsonWebToken: string,
): Promise<JsonWebTokenPayload | null> {
	try {
		const { payload } = await jwtVerify<JsonWebTokenPayload>(
			jsonWebToken,
			AUTH_SECRET_ENCODED,
			{
				algorithms: [
					'HS256',
				],
				audience: JOSE_AUDIENCE,
				issuer: JOSE_ISSUER,
			},
		);

		return payload;
	} catch {
		return null;
	}
}

export interface JsonWebTokenPayload extends JWTPayload {
	user: User;
}
