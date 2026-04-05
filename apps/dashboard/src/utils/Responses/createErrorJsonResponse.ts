import { NextResponse } from 'next/server';

export function createErrorJsonResponse(
	statusCode: number,
	statusText: string,
	data: CreateErrorResponseData,
): NextResponse {
	return NextResponse.json(
		{
			error: data,
			success: false,
		},
		{
			status: statusCode,
			statusText,
		},
	);
}

interface CreateErrorResponseData {
	code: string;
	details?: Record<string, unknown>;
	message: string;
}
