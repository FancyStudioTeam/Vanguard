export interface SessionData {
	guilds: SessionGuild[];
	user: SessionUser;
}

export interface SessionGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	permissions: string;
}

export interface SessionUser {
	avatar: string | null;
	globalName: string | null;
	id: string;
	username: string;
}
