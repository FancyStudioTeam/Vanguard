import { type JWTVerifyOptions, jwtVerify } from 'jose';
import {
	JOSE_AUDIENCE,
	JOSE_AUTH_SECRET,
	JOSE_ISSUER,
} from '#lib/Constants/Jose.ts';
import type { AuthJsonWebTokenPayload } from '#types/Auth.ts';

const JWT_VERIFY_OPTIONS: JWTVerifyOptions = {
	algorithms: [
		'HS256',
	],
	audience: JOSE_AUDIENCE,
	issuer: JOSE_ISSUER,
};

export async function verifyJsonWebToken(
	jsonWebToken: string,
): Promise<AuthJsonWebTokenPayload> {
	return await jwtVerify<AuthJsonWebTokenPayload>(
		jsonWebToken,
		JOSE_AUTH_SECRET,
		JWT_VERIFY_OPTIONS,
	).then(({ payload }) => payload);
}
