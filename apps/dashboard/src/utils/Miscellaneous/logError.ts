import type { NextRequest } from 'next/server';
import { logger } from '#lib/Logger.ts';

export function logError(nextRequest: NextRequest, error: unknown): void {
	const { nextUrl } = nextRequest;
	const { href } = nextUrl;

	logger.error(`Error while processing route '${href}':\n\t`, error);
}
