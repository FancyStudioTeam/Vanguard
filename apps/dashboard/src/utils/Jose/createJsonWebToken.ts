import { SignJWT } from 'jose';
import {
	JOSE_AUDIENCE,
	JOSE_AUTH_SECRET,
	JOSE_ISSUER,
} from '#lib/Constants/Jose.ts';
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

	return await signJwt.sign(JOSE_AUTH_SECRET);
}
