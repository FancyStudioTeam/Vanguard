import type { NextRequest } from 'next/server';
import { logger } from '#/lib/Logger.ts';
import { SessionUtils } from '#/lib/Session.ts';
import { INTERNAL_SERVER_ERROR_RESPONSE } from '../sign-in/_lib/Responses.ts';
import { SESSION_RESPONSE, UNAUTHORIZED_RESPONSE } from './_lib/Responses.ts';

export async function GET(nextRequest: NextRequest) {
	try {
		const sessionCookieValue = await SessionUtils.getSessionCookieValue();
		const jsonWebTokenPayload = await SessionUtils.verifySessionCookie(sessionCookieValue);

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
