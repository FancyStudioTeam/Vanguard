import type { NextRequest } from 'next/server';
import { logger } from '#/lib/Logger.ts';
import { getSessionCookieValue } from '#/utils/session/getSessionCookieValue.ts';
import { verifySessionCookie } from '#/utils/session/verifySessionCookie.ts';
import { INTERNAL_SERVER_ERROR_RESPONSE } from '../sign-in/_lib/Responses.ts';
import { SESSION_RESPONSE, UNAUTHORIZED_RESPONSE } from './_lib/Responses.ts';

export async function GET(nextRequest: NextRequest) {
	try {
		const sessionCookieValue = await getSessionCookieValue();
		const jsonWebTokenPayload = await verifySessionCookie(sessionCookieValue);

		if (!jsonWebTokenPayload) {
			return UNAUTHORIZED_RESPONSE();
		}

		const { user } = jsonWebTokenPayload;

		return SESSION_RESPONSE(user);
	} catch (error) {
		const { nextUrl } = nextRequest;
		const { href } = nextUrl;

		logger.error(`Error while processing route '${href}':\n\t`, error);

		return INTERNAL_SERVER_ERROR_RESPONSE();
	}
}
