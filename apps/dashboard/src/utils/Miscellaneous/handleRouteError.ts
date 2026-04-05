import type { NextRequest, NextResponse } from 'next/server';
import { logger } from '#lib/Logger.ts';
import { INTERNAL_SERVER_ERROR_RESPONSE } from '#lib/Responses/Shared.ts';

export function handleRouteError(
	nextRequest: NextRequest,
	error: unknown,
): NextResponse {
	const { nextUrl } = nextRequest;
	const { href } = nextUrl;

	logger.error(`Error while processing API route '${href}':\n\t`, error);

	return INTERNAL_SERVER_ERROR_RESPONSE();
}
