import 'server-only';
import type { Snowflake } from 'discord-api-types/globals';

export interface SessionEndpointDataResponse {
	avatar: string | null;
	id: Snowflake;
	name: string;
}
