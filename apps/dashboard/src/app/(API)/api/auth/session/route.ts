import type { NextRequest } from 'next/server';
import { SessionsCollection } from '#lib/MongoDB/Auth.ts';
import { handleRouteError } from '#utils/Miscellaneous/handleRouteError.ts';
import { getSessionId } from '#utils/Session/getSessionId.ts';
import { SESSION_RESPONSE, UNAUTHORIZED_RESPONSE } from './_lib/Responses.ts';

export async function GET(nextRequest: NextRequest) {
	try {
		const sessionId = await getSessionId();
		const session = await SessionsCollection.findOne({
			sessionId,
		});

		if (!session) {
			return UNAUTHORIZED_RESPONSE();
		}

		const { user } = session;

		return SESSION_RESPONSE(user);
	} catch (error) {
		return handleRouteError(nextRequest, error);
	}
}
