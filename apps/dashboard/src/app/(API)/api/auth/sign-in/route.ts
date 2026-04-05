import { type NextRequest, NextResponse } from 'next/server';
import { logError } from '#utils/Miscellaneous/logError.ts';
import { createRedirectUrl } from '#utils/URL/createRedirectUrl.ts';
import { INTERNAL_SERVER_ERROR_RESPONSE } from './_lib/Responses.ts';

export function GET(nextRequest: NextRequest) {
	try {
		const redirectUrl = createRedirectUrl();

		return NextResponse.redirect(redirectUrl);
	} catch (error) {
		logError(nextRequest, error);

		return INTERNAL_SERVER_ERROR_RESPONSE();
	}
}
