export interface User {
	avatar: string | null;
	globalName: string | null;
	id: string;
	username: string;
}

export interface UserGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	permissions: string;
}
