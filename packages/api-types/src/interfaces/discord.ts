// biome-ignore-all lint/style/useNamingConvention: (x)

export interface APIGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	owner_id: string;
}

export interface APIUser {
	avatar: string | null;
	global_name: string | null;
	id: string;
	username: string;
}

export interface APIUserGuild {
	banner: string | null;
	icon: string | null;
	id: string;
	name: string;
	permissions: string;
}
