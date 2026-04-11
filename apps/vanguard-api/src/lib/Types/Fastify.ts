import type { Session as FastifySecureSession } from '@fastify/secure-session';
import type { User } from './Discord.js';

export interface FastifySessionData {
	sessionId: string;
	sessionUser: FastifySessionUser;
}

export type FastifySession = FastifySecureSession<FastifySessionData>;
export type FastifySessionUser = User;
