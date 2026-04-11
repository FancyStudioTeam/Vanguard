import type { Session as FastifySecureSession } from '@fastify/secure-session';
import type { User } from './Discord.js';

export interface FastifySessionData {
	sessionId: string;
	user: FastifySessionDataUser;
}

export type FastifySession = FastifySecureSession<FastifySessionData>;
export type FastifySessionDataUser = User;
