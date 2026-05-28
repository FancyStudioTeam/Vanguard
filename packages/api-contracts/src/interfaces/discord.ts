export interface DiscordGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	owner_id: string;
}

export interface DiscordGuildChannel {
	id: string;
	name: string;
	type: unknown;
}

export interface DiscordUser {
	avatar: string | null;
	global_name: string | null;
	id: string;
	username: string;
}

export interface DiscordUserGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	permissions: string;
}
