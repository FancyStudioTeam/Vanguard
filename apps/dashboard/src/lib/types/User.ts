import type { Snowflake } from 'discord-api-types/globals';

export interface User {
	avatar: string | null;
	id: Snowflake;
	name: string;
}

export interface UserGuild {
	icon: string | null;
	id: Snowflake;
	name: string;
	owner: boolean;
	permissions: string;
}
