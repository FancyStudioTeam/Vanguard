import type { NextRequest } from 'next/server';
import { verifyJsonWebToken } from '#utils/Jose/verifyJsonWebToken.ts';
import { handleRouteError } from '#utils/Miscellaneous/handleRouteError.ts';
import { getSessionCookieValue } from '#utils/Session/getSessionCookieValue.ts';
import { SESSION_RESPONSE, UNAUTHORIZED_RESPONSE } from './_lib/Responses.ts';

export async function GET(nextRequest: NextRequest) {
	try {
		const sessionCookieValue = await getSessionCookieValue();
		const jsonWebTokenPayload = await verifyJsonWebToken(
			sessionCookieValue ?? '',
		).catch(() => null);

		if (!jsonWebTokenPayload) {
			return UNAUTHORIZED_RESPONSE();
		}

		const { user } = jsonWebTokenPayload;

		return SESSION_RESPONSE(user);
	} catch (error) {
		return handleRouteError(nextRequest, error);
	}
}
