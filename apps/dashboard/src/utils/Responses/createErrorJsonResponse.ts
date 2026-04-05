import { NextResponse } from 'next/server';

export function createErrorJsonResponse(
	statusCode: number,
	statusText: string,
	error: CreateErrorResponseError,
): NextResponse {
	return NextResponse.json(
		{
			error,
			success: false,
		},
		{
			status: statusCode,
			statusText,
		},
	);
}

interface CreateErrorResponseError {
	code: string;
	details?: Record<string, unknown>;
	message: string;
}
