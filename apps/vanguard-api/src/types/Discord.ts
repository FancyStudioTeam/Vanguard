import type { AuthUser } from './Auth.js';

export interface UserAccessResult {
	accessToken: string;
	refreshToken: string;
}

export interface UserGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	permissions: string;
}

export type User = AuthUser;
