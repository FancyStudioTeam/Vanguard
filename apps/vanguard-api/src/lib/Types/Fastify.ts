import type { Session as FastifySecureSession } from '@fastify/secure-session';

export interface FastifySessionData {
	accessToken: string;
	accessTokenExpiresIn: number;
	accessTokenType: string;
	refreshToken: string;
	userId: string;
}

export type FastifySession = FastifySecureSession<FastifySessionData>;
