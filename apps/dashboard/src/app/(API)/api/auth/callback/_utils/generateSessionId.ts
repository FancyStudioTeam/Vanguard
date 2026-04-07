import { randomBytes } from 'node:crypto';

const SESSION_ID_BYTES_LENGTH = 32;

export function generateSessionId(): string {
	const sessionIdBytes = randomBytes(SESSION_ID_BYTES_LENGTH);
	const sessionId = sessionIdBytes.toString('hex');

	return sessionId;
}
