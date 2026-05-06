import type { Session as FastifySecureSession } from '@fastify/secure-session';

export interface FastifySessionData {
	sessionId: string;
	sessionUserId: string;
}

export type FastifySession = FastifySecureSession<FastifySessionData>;
