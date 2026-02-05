import 'server-only';
import { NextResponse } from 'next/server';

export function createJsonResponse(
	statusCode: number,
	statusText: string,
	data: unknown,
): NextResponse {
	return NextResponse.json(
		{
			data,
			success: true,
		},
		{
			status: statusCode,
			statusText,
		},
	);
}
