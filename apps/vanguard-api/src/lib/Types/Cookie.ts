import type { Session as FastifySecureSession } from '@fastify/secure-session';

export interface FastifySessionData {
	sessionId: string;
	userId: string;
}

export type FastifySession = FastifySecureSession<FastifySessionData>;
