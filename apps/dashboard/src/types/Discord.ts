export interface Guild {
	icon: string | null;
	id: string;
	name: string;
}

export interface User {
	avatar: string | null;
	id: string;
	name: string;
}

export interface UserCredentials {
	accessToken: string;
	expiresIn: number;
	refreshToken: string;
}

export interface UserGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	owner: boolean;
	permissions: string;
}
