import { type JWTPayload, jwtVerify } from 'jose';
import {
	JSON_WEB_TOKEN_AUDIENCE,
	JSON_WEB_TOKEN_ISSUER,
	TEXT_ENCODER_SECRET,
} from '#/lib/Constants.ts';
import type { User } from '#/lib/types/User.ts';

export async function verifyJsonWebToken(
	jsonWebToken: string,
): Promise<JsonWebTokenPayload | null> {
	try {
		const { payload } = await jwtVerify<JsonWebTokenPayload>(
			jsonWebToken,
			TEXT_ENCODER_SECRET,
			{
				algorithms: [
					'HS256',
				],
				audience: JSON_WEB_TOKEN_AUDIENCE,
				issuer: JSON_WEB_TOKEN_ISSUER,
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
