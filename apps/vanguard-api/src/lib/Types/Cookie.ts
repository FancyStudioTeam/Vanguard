import type { Session as FastifySecureSession } from '@fastify/secure-session';

export interface FastifySessionData {
	sessionId: string;
	user: FastifySessionDataUser;
}

export interface FastifySessionDataUser {
	avatar: string | null;
	globalName: string | null;
	id: string;
	username: string;
}

export type FastifySession = FastifySecureSession<FastifySessionData>;
