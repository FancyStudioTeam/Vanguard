export interface Guild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	ownerId: string;
}

export interface User {
	avatar: string | null;
	globalName: string | null;
	id: string;
	username: string;
}

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
