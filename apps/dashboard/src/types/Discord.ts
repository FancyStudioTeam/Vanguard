import type { Snowflake } from 'discord-api-types/globals';

export interface Guild {
	id: Snowflake;
	name: string;
}

export interface User {
	avatar: string | null;
	id: Snowflake;
	name: string;
}

export interface UserCredentials {
	accessToken: string;
	refreshToken: string;
}

export interface UserGuild {
	banner: string | null;
	icon: string | null;
	id: Snowflake;
	name: string;
	owner: boolean;
	permissions: string;
}
