import { type NextRequest, NextResponse } from 'next/server';
import { handleRouteError } from '#utils/Miscellaneous/handleRouteError.ts';
import { createRedirectUrl } from '#utils/URL/createRedirectUrl.ts';

export function GET(nextRequest: NextRequest) {
	try {
		return NextResponse.redirect(createRedirectUrl());
	} catch (error) {
		return handleRouteError(nextRequest, error);
	}
}
