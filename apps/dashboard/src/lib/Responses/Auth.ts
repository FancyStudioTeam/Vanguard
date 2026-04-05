// biome-ignore-all lint/style/useNamingConvention: (x)

import type { NextResponse } from 'next/server';
import {
	INTERNAL_SERVER_ERROR_STATUS_CODE,
	INTERNAL_SERVER_ERROR_STATUS_TEXT,
} from '#lib/HttpStatus.ts';
import { createErrorJsonResponse } from '#utils/Responses/createErrorJsonResponse.ts';

export function UNABLE_TO_EXCHANGE_CODE_RESPONSE(): NextResponse {
	return createErrorJsonResponse(
		INTERNAL_SERVER_ERROR_STATUS_CODE,
		INTERNAL_SERVER_ERROR_STATUS_TEXT,
		{
			code: 'UNABLE_TO_EXCHANGE_CODE',
			message: 'Unable to exchange your authorization code with Discord',
		},
	);
}

export function UNABLE_TO_GET_USER_INFORMATION_RESPONSE(): NextResponse {
	return createErrorJsonResponse(
		INTERNAL_SERVER_ERROR_STATUS_CODE,
		INTERNAL_SERVER_ERROR_STATUS_TEXT,
		{
			code: 'UNABLE_TO_GET_USER_INFORMATION',
			message: 'Unable to get your user information from Discord',
		},
	);
}
