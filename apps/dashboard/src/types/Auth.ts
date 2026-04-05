import type { JWTPayload } from 'jose';
import type { User } from './Discord.ts';

export interface AuthJsonWebTokenPayload extends JWTPayload {
	sid: string;
	user: AuthUser;
}

export type AuthUser = User;
