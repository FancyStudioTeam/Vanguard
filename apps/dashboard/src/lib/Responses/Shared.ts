// biome-ignore-all lint/style/useNamingConvention: (x)

import type { NextResponse } from 'next/server';
import {
	BAD_REQUEST_STATUS_CODE,
	BAD_REQUEST_STATUS_TEXT,
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_TEXT,
	TOO_MANY_REQUESTS_STATUS_CODE,
	TOO_MANY_REQUESTS_STATUS_TEXT,
} from '#lib/HttpStatus.ts';
import { createErrorJsonResponse } from '#utils/Responses/createErrorJsonResponse.ts';

export function INTERNAL_SERVER_ERROR_RESPONSE(): NextResponse {
	return createErrorJsonResponse(
		INTERNAL_SERVER_ERROR_STATUS_CODE,
		INTERNAL_SERVER_ERROR_STATUS_TEXT,
		{
			code: 'INTERNAL_SERVER_ERROR',
			message:
				'Something went wrong while processing your request. Please try again in a few seconds.',
		},
	);
}

export function MISSING_QUERY_STRING_PARAM_RESPONSE(
	name: string,
): NextResponse {
	return createErrorJsonResponse(
		BAD_REQUEST_STATUS_CODE,
		BAD_REQUEST_STATUS_TEXT,
		{
			code: 'MISSING_QUERY_STRING_PARAM',
			details: {
				name,
			},
			message: 'Missing query string parameter from URL',
		},
	);
}

export function RATE_LIMITED_BY_DISCORD_RESPONSE(): NextResponse {
	return createErrorJsonResponse(
		TOO_MANY_REQUESTS_STATUS_CODE,
		TOO_MANY_REQUESTS_STATUS_TEXT,
		{
			code: 'RATE_LIMITED_BY_DISCORD',
			message:
				'You are being rate limited by Discord. Please try again in a few seconds.',
		},
	);
}

export function RATE_LIMITED_RESPONSE(): NextResponse {
	return createErrorJsonResponse(
		TOO_MANY_REQUESTS_STATUS_CODE,
		TOO_MANY_REQUESTS_STATUS_TEXT,
		{
			code: 'RATE_LIMITED',
			message:
				'You are being rate limited. Please try again in a few seconds.',
		},
	);
}
