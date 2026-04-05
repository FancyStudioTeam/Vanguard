import { SignJWT } from 'jose';
import {
	AUTH_SECRET_ENCODED,
	JOSE_AUDIENCE,
	JOSE_ISSUER,
} from '#lib/Constants.ts';
import type { AuthJsonWebTokenPayload } from '#types/Auth.ts';

export async function createJsonWebToken(
	jwtPayload: AuthJsonWebTokenPayload,
): Promise<string> {
	const signJwt = new SignJWT(jwtPayload);

	signJwt.setProtectedHeader({
		alg: 'HS256',
		typ: 'JWT',
	});

	signJwt.setAudience(JOSE_AUDIENCE);

	signJwt.setIssuer(JOSE_ISSUER);
	signJwt.setIssuedAt();

	signJwt.setExpirationTime('1d');

	return await signJwt.sign(AUTH_SECRET_ENCODED);
}
