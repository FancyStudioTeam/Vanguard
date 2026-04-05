import type { NextRequest, NextResponse } from 'next/server';
import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_TEXT,
} from '#lib/HttpStatus.ts';
import { logger } from '#lib/Logger.ts';
import { createErrorJsonResponse } from '#utils/Responses/createErrorJsonResponse.ts';

export function handleRouteError(nextRequest: NextRequest, error: unknown): NextResponse {
	const { nextUrl } = nextRequest;
	const { href } = nextUrl;

	logger.error(`Error while processing API route '${href}':\n\t`, error);

	return createErrorJsonResponse(
		INTERNAL_SERVER_ERROR_STATUS_CODE,
		INTERNAL_SERVER_ERROR_STATUS_TEXT,
		{
			code: 'INTERNAL_SERVER_ERROR',
			message: 'Something went wrong while processing your request',
		},
	);
}
